# Whoowhoo Travels – API Specification (Developer)

Base URL: `http://localhost:3000/api` (or your deployed host).

All JSON request/response unless noted. Auth where required uses **Bearer token** in `Authorization` header after admin login.

---

## 1. Contact Form

**Purpose:** Let site visitors send an enquiry. Requirements and fields can be agreed with the client.

| Method | Endpoint        | Auth | Description        |
|--------|-----------------|------|--------------------|
| POST   | `/contact`      | No   | Submit contact form |

### Suggested request body (discuss with client)

```json
{
  "name": "string, required",
  "email": "string, required",
  "phone": "string, optional",
  "subject": "string, optional",
  "message": "string, required",
  "preferredContact": "email | phone, optional"
}
```

### Possible additions (client discussion)

- `tripInterest` (e.g. destination or package name)
- `travelDate` (rough date)
- `numberOfTravelers`
- `source` (e.g. website, referral) for analytics

### Response

- **201:** `{ "success": true, "id": "<submissionId>" }`
- **400:** Validation errors

---

## 2. Booking Form

**Purpose:** Capture booking requests or enquiries. Exact flow (request-only vs payment integration) and fields to be decided with client.

| Method | Endpoint        | Auth | Description          |
|--------|-----------------|------|----------------------|
| POST   | `/bookings`     | No   | Submit booking form  |
| GET    | `/bookings/:id` | No*  | Get booking status   (*optional: public token vs admin-only) |

### Suggested request body (discuss with client)

```json
{
  "packageId": "string, required (ref to package)",
  "name": "string, required",
  "email": "string, required",
  "phone": "string, required",
  "travelDate": "date or string, optional",
  "numberOfAdults": "number, optional",
  "numberOfChildren": "number, optional",
  "specialRequests": "string, optional",
  "billingAddress": { "line1", "city", "state", "country", "postalCode" },
  "paymentIntent": "optional, if integrating payments later"
}
```

### Possible additions (client discussion)

- Number of rooms / room type
- Flight preferences (if applicable)
- Passport/ID details (if required for visa)
- Deposit amount and payment method
- Terms acceptance flag and timestamp

### Response

- **201:** `{ "success": true, "bookingId": "<id>", "status": "pending" }`
- **400:** Validation errors  
- **404:** Invalid `packageId`

---

## 3. Admin – Auth

**Purpose:** Admin login and registration. Registration may be restricted (e.g. first user only or invite-only) – to be decided.

| Method | Endpoint           | Auth   | Description     |
|--------|--------------------|--------|-----------------|
| POST   | `/admin/register`  | No     | Create admin    |
| POST   | `/admin/login`    | No     | Login, get token |

### Register – request body (discuss with client)

```json
{
  "email": "string, required",
  "password": "string, required",
  "name": "string, optional"
}
```

### Login – request body

```json
{
  "email": "string, required",
  "password": "string, required"
}
```

### Login – response

```json
{
  "token": "JWT or session token",
  "admin": { "id", "email", "name" }
}
```

All other admin endpoints below assume header: `Authorization: Bearer <token>`.

---

## 4. Admin – Packages

**Purpose:** CRUD for travel packages (tours, trips) that appear on the site and can be selected in the booking form.

| Method | Endpoint           | Auth | Description        |
|--------|--------------------|------|--------------------|
| GET    | `/admin/packages`  | Yes  | List packages      |
| GET    | `/admin/packages/:id` | Yes | Get one package    |
| POST   | `/admin/packages`  | Yes  | Add package        |
| PATCH  | `/admin/packages/:id` | Yes | Update package     |
| DELETE | `/admin/packages/:id` | Yes | Delete package     |

### Public (for website) – optional

| Method | Endpoint        | Auth | Description     |
|--------|-----------------|------|-----------------|
| GET    | `/packages`     | No   | List published  |
| GET    | `/packages/:id` | No   | Get one package |

### Suggested package payload (discuss with client)

```json
{
  "title": "string, required",
  "slug": "string, optional (auto from title)",
  "shortDescription": "string",
  "description": "string (rich text or markdown)",
  "duration": "e.g. 5 Days / 4 Nights",
  "price": "number",
  "currency": "string, e.g. USD",
  "images": ["array of image IDs or URLs"],
  "highlights": ["string array"],
  "itinerary": [{ "day": 1, "title": "", "content": "" }],
  "inclusions": ["string array"],
  "exclusions": ["string array"],
  "status": "draft | published",
  "featured": "boolean",
  "sortOrder": "number"
}
```

### Possible additions (client discussion)

- Multiple price tiers (e.g. per person, per group)
- Dates / fixed departures
- Destinations or tags
- Max/min travelers
- Category (e.g. adventure, family, luxury)

---

## 5. Admin – Photos / Media

**Purpose:** Upload and manage images (for packages, gallery, content). Storage (local vs S3/Cloudinary) to be decided.

| Method | Endpoint            | Auth | Description        |
|--------|---------------------|------|--------------------|
| POST   | `/admin/photos`     | Yes  | Upload photo(s)    |
| GET    | `/admin/photos`     | Yes  | List photos        |
| GET    | `/admin/photos/:id` | Yes  | Get one            |
| DELETE | `/admin/photos/:id` | Yes  | Delete photo       |

### Upload – request

- **Content-Type:** `multipart/form-data`
- **Fields (suggested):** `file` (or `files`), optional `caption`, `alt`, `folder`/`category`

### Suggested response (per image)

```json
{
  "id": "string",
  "url": "string (public URL)",
  "caption": "string",
  "alt": "string",
  "uploadedAt": "ISO date"
}
```

### Possible additions (client discussion)

- Folders/albums (e.g. per package, per destination)
- Max dimensions / auto resize
- Allowed MIME types and max file size

---

## 6. Admin – Content (Pages / CMS-like)

**Purpose:** Manage static or semi-static content (e.g. About, FAQ, Terms, Home hero text). Exact content types to be agreed with client.

| Method | Endpoint              | Auth | Description        |
|--------|------------------------|------|--------------------|
| GET    | `/admin/contents`     | Yes  | List content items |
| GET    | `/admin/contents/:key`| Yes  | Get by key/slug    |
| PUT    | `/admin/contents/:key`| Yes  | Create or update   |
| DELETE | `/admin/contents/:key`| Yes  | Remove             |

### Suggested content item (discuss with client)

```json
{
  "key": "string, unique (e.g. about, faq, home_hero)",
  "title": "string",
  "body": "string (HTML or markdown)",
  "metaTitle": "string, for SEO",
  "metaDescription": "string, for SEO",
  "updatedAt": "ISO date"
}
```

### Public (for website)

| Method | Endpoint         | Auth | Description        |
|--------|------------------|------|--------------------|
| GET    | `/contents/:key` | No   | Get content by key |

### Possible content keys (client discussion)

- `home_hero`, `home_intro`, `home_testimonials`
- `about`, `contact_info`, `faq`
- `terms`, `privacy`, `cancellation_policy`

---

## 7. Summary – For Client Discussion

| Area           | Decide with client                                      |
|----------------|----------------------------------------------------------|
| Contact form   | Fields (phone, subject, trip interest, etc.)            |
| Booking form   | Fields, payment flow, statuses, confirmation emails     |
| Admin auth     | Register rules, password policy, 2FA                     |
| Packages       | Fields, pricing model, itinerary format, categories    |
| Photos         | Storage, size limits, folders, alt text required       |
| Content        | Which pages/keys, rich text vs markdown, SEO fields     |

---

## 8. Suggested Implementation Order (Developers)

1. **Admin auth** – register, login, JWT middleware.
2. **Packages** – model + admin CRUD; then public list/detail if needed.
3. **Contact form** – model + single POST; optional email notification.
4. **Booking form** – model + POST; link to package; optional status GET.
5. **Photos** – upload + storage; link from packages.
6. **Content** – key-value or document store; admin CRUD + public GET.

Use the health check: `GET /api/health`.
