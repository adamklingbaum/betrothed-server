# betrothed API

_View example requests in Postman_

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/91f5e1d2d4de33d70d36?action=collection%2Fimport)

1. Download the collection to your workspace in Postman.
2. Navigate to the variables tab of the collection.
3. Populate the `CURRENT VALUE` (**not** `INITIAL VALUE`) of the `base_url` variable with the base url you have been given. All pre-populated requests are configured to reference this `base_url` and you may reference this `base_url`, as follows, in any newly created requests.

Example use of the `base_url` variable for newly created requests in Postman:

```
GET {{base_url}}/events
PUT {{base_url}}/events/abcd1234
POST {{base_url}}/events/abcd1234/guests
```

---

### `POST` /events

Creates an event

#### Body parameters

| Parameter         | Type                                      | Required | Default | Description                                                                                                     |
| :---------------- | :---------------------------------------- | :------- | :------ | :-------------------------------------------------------------------------------------------------------------- |
| coupleName1       | string                                    | yes      | none    | name of an individual in the couple                                                                             |
| coupleName2       | string                                    | yes      | none    | name of the other individual in the couple                                                                      |
| email             | string                                    | yes      | none    | couple's designated contact email                                                                               |
| date              | string (ISOString)                        | yes      | none    | date (with time) of the event                                                                                   |
| venue             | string                                    | yes      | none    | name of the event venue                                                                                         |
| addressLine1      | string                                    | yes      | none    | street address of the event venue                                                                               |
| addressLine2      | string                                    | no       | none    | unit/apt/suite/other as applicable                                                                              |
| city              | string                                    | yes      | none    | city of the event                                                                                               |
| state             | string (official 2-letter abbreviation)   | yes      | none    | state of the event                                                                                              |
| zip               | string                                    | yes      | none    | zip code of the event                                                                                           |
| guestLimit        | integer                                   | no       | none    | limit on guests to the event                                                                                    |
| rsvpDeadline      | string (ISOString)                        | yes      | none    | deadline for a guest to RSVP                                                                                    |
| inviteMessage     | string                                    | yes      | none    | customized invitation message sent to guests                                                                    |
| dashboardPhotoURL | string                                    | no       | none    | photo to display on couple's dashboard                                                                          |
| bannerPhotoURL    | string                                    | no       | none    | main photo to display on invitations                                                                            |
| galleryPhotos     | object { [number]: [url_as_string] }      | no       | none    | photos to display in carousel on invitations; keys are photo numbers and values are public URLs as strings      |
| colors            | object { [number]: [hex_code_as_string] } | no       | none    | custom invitation color scheme picked by the couple; keys are color numbers and values are hex codes as strings |

#### Sample response

```json
{
  "createdEvent": {
    "coupleName1": "Ford",
    "coupleName2": "Ferrari",
    "email": "ford_ferrari_wedding@domain.com",
    "date": "2022-12-13T00:00:00.000Z",
    "venue": "The Big Venue",
    "addressLine1": "123 Big Venue St.",
    "addressLine2": "Suite 12",
    "city": "Austin",
    "state": "TX",
    "zip": "12345",
    "guestLimit": 100,
    "rsvpDeadline": "2022-06-13T00:00:00.000Z",
    "inviteMessage": "Please join us in celebrating our new life together.",
    "dashboardPhotoURL": "shorturl.at/tuHZ3",
    "bannerPhotoURL": "shorturl.at/tuHZ3",
    "galleryPhotos": {
      "1": "shorturl.at/tuHZ3",
      "2": "shorturl.at/tuHZ3"
    },
    "colors": {
      "1": "#FFFFFF",
      "2": "#000000"
    },
    "_id": "61b79b9e0ac02dbe3e12fd1b",
    "__v": 0
  }
}
```

---

### `GET` /events/:eventId

Returns an event

#### Path parameters

| Parameter | Type   | Required | Default | Description                        |
| :-------- | :----- | :------- | :------ | :--------------------------------- |
| eventId   | string | yes      | none    | id of the event you are retrieving |

#### Sample response

```json
{
  "_id": "61b79b9e0ac02dbe3e12fd1b",
  "coupleName1": "Ford",
  "coupleName2": "Ferrari",
  "email": "ford_ferrari_wedding@domain.com",
  "date": "2022-12-13T00:00:00.000Z",
  "venue": "The Big Venue",
  "addressLine1": "123 Big Venue St.",
  "addressLine2": "Suite 12",
  "city": "Austin",
  "state": "TX",
  "zip": "12345",
  "guestLimit": 200,
  "rsvpDeadline": "2022-06-13T00:00:00.000Z",
  "inviteMessage": "Please join us in celebrating our new life together.",
  "dashboardPhotoURL": "shorturl.at/tuHZ3",
  "bannerPhotoURL": "shorturl.at/tuHZ3",
  "galleryPhotos": {
    "1": "shorturl.at/tuHZ3",
    "2": "shorturl.at/tuHZ3"
  },
  "colors": {
    "1": "#ABC123",
    "2": "#123ABC"
  },
  "__v": 0,
  "guests": {
    "Individual": [
      {
        "_id": "61b79f4b660830696a8985c3",
        "firstName": "Guest",
        "lastName": "Two",
        "email": "guest_two@domain.com",
        "rsvpStatus": "pending",
        "group": "Individual",
        "event": "61b79b9e0ac02dbe3e12fd1b",
        "__v": 0
      }
    ],
    "Three Family": [
      {
        "_id": "61b7acb5da2ddaf0d73c5aae",
        "firstName": "Guest",
        "lastName": "Three",
        "email": "guest_three@domain.com",
        "rsvpStatus": "pending",
        "group": "Three Family",
        "event": "61b79b9e0ac02dbe3e12fd1b",
        "__v": 0
      }
    ],
    "Four Family": [
      {
        "_id": "61b7b1edda2ddaf0d73c5acc",
        "firstName": "Guest",
        "lastName": "Four",
        "email": "guest_four@domain.com",
        "rsvpStatus": "attending",
        "group": "Four Family",
        "event": "61b79b9e0ac02dbe3e12fd1b",
        "__v": 0,
        "rsvpLastUpdated": "2021-12-13T20:50:25.986Z",
        "rsvpNote": "Thanks for the invite! I'll be there."
      }
    ]
  }
}
```

---

### `PUT` /events/:eventId

Updates an event

- Multiple fields may be updated in one request

#### Path parameters

| Parameter | Type   | Required | Default | Description                      |
| :-------- | :----- | :------- | :------ | :------------------------------- |
| eventId   | string | yes      | none    | id of the event you are updating |

#### Body parameters

| Parameter         | Type                                      | Required | Default | Description                                                                                                     |
| :---------------- | :---------------------------------------- | :------- | :------ | :-------------------------------------------------------------------------------------------------------------- |
| coupleName1       | string                                    | no       | none    | name of an individual in the couple                                                                             |
| coupleName2       | string                                    | no       | none    | name of the other individual in the couple                                                                      |
| email             | string                                    | no       | none    | couple's designated contact email                                                                               |
| date              | string (ISOString)                        | no       | none    | date (with time) of the event                                                                                   |
| venue             | string                                    | no       | none    | name of the event venue                                                                                         |
| addressLine1      | string                                    | no       | none    | street address                                                                                                  |
| addressLine2      | string                                    | no       | none    | unit/apt/suite/other as applicable                                                                              |
| city              | string                                    | no       | none    | city of the event                                                                                               |
| state             | string (official 2-letter abbreviation)   | no       | none    | state of the event                                                                                              |
| zip               | string                                    | no       | none    | zip code of the event                                                                                           |
| guestLimit        | integer                                   | no       | none    | limit on guests to the event                                                                                    |
| rsvpDeadline      | string (ISOString)                        | no       | none    | deadline for a guest to RSVP                                                                                    |
| inviteMessage     | string                                    | no       | none    | customized invitation message sent to guests                                                                    |
| dashboardPhotoURL | string                                    | no       | none    | photo to display on couple's dashboard                                                                          |
| bannerPhotoURL    | string                                    | no       | none    | main photo to display on invitations                                                                            |
| galleryPhotos     | object { [number]: [url_as_string] }      | no       | none    | photos to display in carousel on invitations; keys are photo numbers and values are public URLs as strings      |
| colors            | object { [number]: [hex_code_as_string] } | no       | none    | custom invitation color scheme picked by the couple; keys are color numbers and values are hex codes as strings |

---

### `POST` /events/:eventId/guests

Adds a guest to an event

#### Path parameters

| Parameter | Type   | Required | Default | Description                        |
| :-------- | :----- | :------- | :------ | :--------------------------------- |
| eventId   | string | yes      | none    | id of the event you are posting to |

#### Body parameters

| Parameter | Type   | Required | Default      | Description                                                                     |
| :-------- | :----- | :------- | :----------- | :------------------------------------------------------------------------------ |
| firstName | string | yes      | none         | guest first name                                                                |
| lastName  | string | yes      | none         | guest last name                                                                 |
| email     | string | yes      | none         | guest email address; will be the default email to which communications are sent |
| group     | string | no       | 'Individual' | name of group                                                                   |

#### Sample response

```json
{
  "createdGuest": {
    "firstName": "Guest",
    "lastName": "One",
    "email": "guest_one@domain.com",
    "rsvpStatus": "pending",
    "group": "One Family",
    "event": "61b79b9e0ac02dbe3e12fd1b",
    "_id": "61b79ef2660830696a8985bd",
    "__v": 0
  }
}
```

---

### `GET` /events/:eventId/guests

Returns a guest, identified by `email`

#### Path parameters

| Parameter | Type   | Required | Default | Description                        |
| :-------- | :----- | :------- | :------ | :--------------------------------- |
| eventId   | string | yes      | none    | id of the event you are retrieving |

#### Query parameters

| Parameter | Type   | Required | Default | Description                                   |
| :-------- | :----- | :------- | :------ | :-------------------------------------------- |
| email     | string | yes      | none    | email address of the guest you are retrieving |

#### Sample response

```json
{
  "_id": "61b7b1edda2ddaf0d73c5acc",
  "firstName": "Guest",
  "lastName": "Four",
  "email": "guest_four@domain.com",
  "rsvpStatus": "attending",
  "group": "Four Family",
  "event": "61b79b9e0ac02dbe3e12fd1b",
  "__v": 0,
  "rsvpLastUpdated": "2021-12-13T20:50:25.986Z",
  "rsvpNote": "Thanks for the invite! I'll be there."
}
```

---

### `PUT` /events/:eventId/guests/:guestId

Updates a guest

- Multiple fields may be updated in one request
- `rspvLastUpdated` is automatically generated at the time of an update

#### Path parameters

| Parameter | Type   | Required | Default | Description                        |
| :-------- | :----- | :------- | :------ | :--------------------------------- |
| eventId   | string | yes      | none    | id of the event you are retrieving |
| guestId   | string | yes      | none    | id of the guest you are updating   |

#### Body parameters

| Parameter  | Type   | Required | Default | Description                                                                     |
| :--------- | :----- | :------- | :------ | :------------------------------------------------------------------------------ |
| firstName  | string | no       | none    | guest first name                                                                |
| lastName   | string | no       | none    | guest last name                                                                 |
| email      | string | no       | none    | guest email address; will be the default email to which communications are sent |
| group      | string | no       | none    | name of group                                                                   |
| rsvpStatus | string | no       | none    | guest's rsvp status; one of "attending", "not attending" and "pending"          |
| rsvpNote   | string | no       | none    | guest's personalized rsvp note                                                  |

---

### `DELETE` /events/:eventId/guests/:guestId

Deletes a guest

#### Path parameters

| Parameter | Type   | Required | Default | Description                        |
| :-------- | :----- | :------- | :------ | :--------------------------------- |
| eventId   | string | yes      | none    | id of the event you are retrieving |
| guestId   | string | yes      | none    | id of the guest you are deleting   |

---

### `GET` /events/:eventId/rsvpData

Returns the rsvpData for an event

#### Path parameters

| Parameter | Type   | Required | Default | Description                        |
| :-------- | :----- | :------- | :------ | :--------------------------------- |
| eventId   | string | yes      | none    | id of the event you are retrieving |

#### Sample response

```json
{
  "eventId": "61b79b9e0ac02dbe3e12fd1b",
  "daysToRSVPDeadline": 181,
  "attending": 0,
  "not attending": 0,
  "pending": 2,
  "total": 2
}
```

---

### `GET` /events/:eventId/groups

Returns the list of existing groups of guests to an event

#### Path parameters

| Parameter | Type    | Required | Default | Description                        |
| :-------- | :------ | :------- | :------ | ---------------------------------- |
| eventId   | integer | yes      | none    | id of the event you are retrieving |

#### Sample response

```json
{
  "eventId": "61b79b9e0ac02dbe3e12fd1b",
  "groups": ["Individual", "Three Family"]
}
```
