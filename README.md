# betrothed API

### `GET` /events/:eventId

Returns an event

#### Path parameters

| Parameter | Required | Default | Description                        |
| --------- | -------- | ------- | :--------------------------------- |
| eventId   | Yes      | None    | Id of the event you are retrieving |

#### Sample response

```json
{
  "eventId": 12,
  "coupleName1": "Ted Baker",
  "coupleName2": "Yves St-Laurent",
  "date": "2021-12-25",
  "location": "Hack Reactor Auditorium\n119 Nueces St\nAustin, TX 78701\nUnited States",
  "daysTo": 15,
  "guestLimit": 100,
  "rsvpDeadline": "2021-12-01",
  "inviteMessage": "Please join us for our special day",
  "bannerPhoto": "shorturl.at/oJW34",
  "galleryPhotos": {
    "1": "shorturl.at/oJW34",
    "2": "shorturl.at/oJW34",
    "3": "shorturl.at/oJW34"
  },
  "colors": {
    "1": "#F0DA32",
    "2": "#87B3BF",
    "3": "#6E4AFF",
    "4": "#5337C9"
  },
  "guests": [
    {
      "guestId": 12,
      "firstName": "billy",
      "lastName": "joel",
      "email": "billy.joel@gmail.com",
      "rsvpStatus": "attending",
      "rvspLastUpdated": "2021-05-23",
      "rsvpNote": "We look forward to attending!",
      "group": "joel family"
    },
    {
      "guestId": 13,
      "firstName": "sara",
      "lastName": "parker",
      "email": "sara.parker@gmail.com",
      "rsvpStatus": "pending",
      "rvspLastUpdated": "2021-05-28",
      "rsvpNote": "",
      "group": null
    },
    {
      "guestId": 14,
      "firstName": "tony",
      "lastName": "belloni",
      "email": "tony.b@gmail.com",
      "rsvpStatus": "not attending",
      "rvspLastUpdated": "2021-05-28",
      "rsvpNote": "Sorry, but I can't come. Have fun!",
      "group": "family friends"
    }
  ]
}
```

---

### `PUT` /events/:eventId

Updates an event

- Multiple fields may be updated at a time

- The only fields that cannot be updated on this route are `galleryPhotos` and `colors`, which have their own routes

#### Path parameters

| Parameter | Required | Default | Description                      |
| :-------- | :------- | :------ | :------------------------------- |
| eventId   | Yes      | None    | Id of the event you are updating |

#### Query parameters

| Parameter   | Required | Default | Description                                                                                                                                       |
| :---------- | :------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| {fieldName} | No       | None    | Name of field to be updated: one of `coupleName1`, `coupleName2`, `date`, `location`, `guestLimit`, `rsvpDeadline`, `inviteMessage`,`bannerPhoto` |
| {fieldName} | No       | None    | Name of field to be updated: one of `coupleName1`, `coupleName2`, `date`, `location`, `guestLimit`, `rsvpDeadline`, `inviteMessage`,`bannerPhoto` |
| ...         | No       | None    | Name of field to be updated: one of `coupleName1`, `coupleName2`, `date`, `location`, `guestLimit`, `rsvpDeadline`, `inviteMessage`,`bannerPhoto` |
| {fieldName} | No       | None    | Name of field to be updated: one of `coupleName1`, `coupleName2`, `date`, `location`, `guestLimit`, `rsvpDeadline`, `inviteMessage`,`bannerPhoto` |

---

### `POST` /events/:eventId/galleryPhotos

To be updated...

---

### `PUT` /events/:eventId/galleryPhotos/:galleryPhotoId

To be updated...

---

### `DELETE` /events/:eventId/galleryPhotos/:galleryPhotoId

To be updated...

---

### `POST` /events/:eventId/colors

To be updated...

---

### `PUT` /events/:eventId/colors/:colorId

To be updated...

---

### `DELETE` /events/:eventId/colors/:colorId

To be updated...

---

### `GET` /events/:eventId/guests/:guestEmail

Returns a guest, identified by `guestEmail`

#### Path parameters

| Parameter  | Required | Default | Description                                   |
| :--------- | :------- | :------ | :-------------------------------------------- |
| eventId    | Yes      | None    | Id of the event you are retrieving            |
| guestEmail | Yes      | None    | Email address of the guest you are retrieving |

#### Sample response

```json
{
  "guestId": 12,
  "firstName": "billy",
  "lastName": "joel",
  "email": "billy.joel@gmail.com",
  "group": "joel family"
  "rsvpStatus": "attending",
  "rvspLastUpdated": "2021-05-23",
  "rsvpNote": "We look forward to attending!"
}
```

---

### `PUT` /events/:eventId/guests/:guestId

Updates a guest

- Multiple fields may be updated in a single request
- `rspvLastUpdated` is automatically generated at the time of an update

#### Path parameters

| Parameter | Required | Default | Description                        |
| :-------- | :------- | :------ | :--------------------------------- |
| eventId   | Yes      | None    | Id of the event you are retrieving |
| guestId   | Yes      | None    | Id of the guest you are updating   |

#### Query parameters

| Parameter   | Required | Default | Description                                                                                    |
| :---------- | :------- | :------ | :--------------------------------------------------------------------------------------------- |
| {fieldName} | No       | None    | Name of field to be updated: one of `firstName`, `lastName`, `rsvpStatus`, `rsvpNote`, `group` |
| {fieldName} | No       | None    | Name of field to be updated: one of `firstName`, `lastName`, `rsvpStatus`, `rsvpNote`, `group` |
| ...         | No       | None    | Name of field to be updated: one of `firstName`, `lastName`, `rsvpStatus`, `rsvpNote`, `group` |
| {fieldName} | No       | None    | Name of field to be updated: one of `firstName`, `lastName`, `rsvpStatus`, `rsvpNote`, `group` |

---

### `POST` /events/:eventId/guests

Adds a guest to an event

#### Path parameters

| Parameter | Required | Default | Description                        |
| :-------- | :------- | :------ | :--------------------------------- |
| eventId   | Yes      | None    | Id of the event you are posting to |

#### Query parameters

| Parameter | Required | Default | Description                                                                     |
| :-------- | :------- | :------ | :------------------------------------------------------------------------------ |
| firstName | Yes      | None    | Guest first name                                                                |
| lastName  | Yes      | None    | Guest last name                                                                 |
| email     | Yes      | None    | Guest email address; will be the default email to which communications are sent |
| group     | No       | None    | Name of group                                                                   |

---

### `DELETE` /events/:eventId/guests/:guestId

Deletes a guest

#### Path parameters

| Parameter | Required | Default | Description                        |
| :-------- | :------- | :------ | :--------------------------------- |
| eventId   | Yes      | None    | Id of the event you are retrieving |
| guestId   | Yes      | None    | Id of the guest you are deleting   |

---

### `GET` /events/:eventId/rsvpData

Returns the rsvpData for an event

#### Path parameters

| Parameter | Required | Default | Description                        |
| --------- | -------- | ------- | :--------------------------------- |
| eventId   | Yes      | None    | Id of the event you are retrieving |

#### Sample response

```json
{
  "eventId": 12,
  "attending": 12,
  "not attending": 3,
  "pending": 50
}
```

---

### `GET` /events/:eventId/groups

Returns the list of existing groups of guests to an event

#### Path parameters

| Parameter | Required | Default | Description                        |
| --------- | -------- | ------- | :--------------------------------- |
| eventId   | Yes      | None    | Id of the event you are retrieving |

#### Sample response

```json
{
  "eventId": 12,
  "groups": ["bridesmaids", "joel family", "byrd family"]
}
```
