# betrothed API

### `POST` /events

Creates an event

#### Body parameters

| Parameter      | Type                                      | Required | Default | Description                                                                                                     |
| :------------- | :---------------------------------------- | :------- | :------ | :-------------------------------------------------------------------------------------------------------------- |
| coupleName1    | string                                    | yes      | none    | name of an individual in the couple                                                                             |
| coupleName2    | string                                    | yes      | none    | name of the other individual in the couple                                                                      |
| dateTime       | string (ISOString)                        | yes      | none    | date (with time) of the event                                                                                   |
| venue          | string                                    | yes      | none    | name of the event venue                                                                                         |
| addressLine1   | string                                    | yes      | none    | street address of the event venue                                                                               |
| addressLine2   | string                                    | no       | none    | unit/apt/suite/other as applicable                                                                              |
| city           | string                                    | yes      | none    | city of the event                                                                                               |
| state          | string (official 2-letter abbreviation)   | yes      | none    | state of the event                                                                                              |
| zip            | string                                    | yes      | none    | zip code of the event                                                                                           |
| guestLimit     | integer                                   | no       | none    | limit on guests to the event                                                                                    |
| rsvpDeadline   | string (ISOString)                        | yes      | none    | deadline for a guest to RSVP                                                                                    |
| inviteMessage  | string                                    | yes      | none    | customized invitation message sent to guests                                                                    |
| dashBoardPhoto | string                                    | no       | none    | photo to display on couple's dashboard                                                                          |
| bannerPhoto    | string                                    | no       | none    | main photo to display on invitations                                                                            |
| galleryPhotos  | object { [number]: [url_as_string] }      | no       | none    | photos to display in carousel on invitations; keys are photo numbers and values are public URLs as strings      |
| colors         | object { [number]: [hex_code_as_string] } | no       | none    | custom invitation color scheme picked by the couple; keys are color numbers and values are hex codes as strings |

#### Sample response

```json
{
  "eventId": 14
}
```

---

### `GET` /events/:eventId

Returns an event

#### Path parameters

| Parameter | Type    | Required | Default | Description                        |
| :-------- | :------ | :------- | :------ | :--------------------------------- |
| eventId   | integer | yes      | none    | id of the event you are retrieving |

#### Sample response

```json
{
  "eventId": 12,
  "coupleName1": "Ted Baker",
  "coupleName2": "Yves St-Laurent",
  "date": "2022-08-12T20:17:46.384Z",
  "venue": "Hack Reactor Auditorium",
  "addressLine1": "119 Nueces St",
  "addressLine2": "Room 1104",
  "city": "Austin",
  "state": "TX",
  "zipCode": "78701",
  "daysToEvent": 15,
  "guestLimit": 100,
  "rsvpDeadline": "2021-12-01T20:17:46.384Z",
  "daysToRSVPDeadline": 12,
  "inviteMessage": "Please join us for our special day",
  "dashboardPhoto": "shorturl.at/oJW34",
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
  "guests": {
    "johnson family": [
      {
        "guestId": 12,
        "firstName": "John",
        "lastName": "Doe",
        "email": "local@domain.com",
        "rsvpStatus": "attending",
        "rvspLastUpdated": "2021-05-23T20:17:46.384Z",
        "rsvpNote": "I look forward to attending!",
        "group": "joel family"
      },
      {
        "guestId": 13,
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "local@domain.com",
        "rsvpStatus": "not attending",
        "rvspLastUpdated": "2021-05-13T20:17:46.384Z",
        "rsvpNote": "I will not be attending your wedding!",
        "group": "johnson family"
      }
    ],
    "family friends": [
      {
        "guestId": 14,
        "firstName": "Ted",
        "lastName": "Smith",
        "email": "local@domain.com",
        "rsvpStatus": "attending",
        "rvspLastUpdated": "2021-05-22T20:17:46.384Z",
        "rsvpNote": "I can't wait! Thanks for thinking of me.",
        "group": "family friends"
      }
    ],
    "individual": [
      {
        "guestId": 15,
        "firstName": "Jack",
        "lastName": "White",
        "email": "local@domain.com",
        "rsvpStatus": "attending",
        "rvspLastUpdated": "2021-05-22T20:17:46.384Z",
        "rsvpNote": "I will be there on your special day!",
        "group": ""
      },
      {
        "guestId": 16,
        "firstName": "Peter",
        "lastName": "Parker",
        "email": "local@domain.com",
        "rsvpStatus": "pending",
        "rvspLastUpdated": "2021-05-22T20:17:46.384Z",
        "rsvpNote": "",
        "group": ""
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

| Parameter | Type    | Required | Default | Description                      |
| :-------- | :------ | :------- | :------ | :------------------------------- |
| eventId   | integer | yes      | none    | id of the event you are updating |

#### Body parameters

| Parameter        | Type                                      | Required | Default | Description                                                                                                     |
| :--------------- | :---------------------------------------- | :------- | :------ | :-------------------------------------------------------------------------------------------------------------- |
| {coupleName1}    | string                                    | no       | none    | name of an individual in the couple                                                                             |
| {coupleName2}    | string                                    | no       | none    | name of the other individual in the couple                                                                      |
| {dateTime}       | string (ISOString)                        | no       | none    | date (with time) of the event                                                                                   |
| {venue}          | string                                    | no       | none    | name of the event venue                                                                                         |
| {addressLine1}   | string                                    | no       | none    | street address                                                                                                  |
| {addressLine2}   | string                                    | no       | none    | unit/apt/suite/other as applicable                                                                              |
| {city}           | string                                    | no       | none    | city of the event                                                                                               |
| {state}          | string (official 2-letter abbreviation)   | no       | none    | state of the event                                                                                              |
| {zip}            | string                                    | no       | none    | zip code of the event                                                                                           |
| {guestLimit}     | integer                                   | no       | none    | limit on guests to the event                                                                                    |
| {rsvpDeadline}   | string (ISOString)                        | no       | none    | deadline for a guest to RSVP                                                                                    |
| {inviteMessage}  | string                                    | no       | none    | customized invitation message sent to guests                                                                    |
| {dashBoardPhoto} | string                                    | no       | none    | photo to display on couple's dashboard                                                                          |
| {bannerPhoto}    | string                                    | no       | none    | main photo to display on invitations                                                                            |
| {galleryPhotos}  | object { [number]: [url_as_string] }      | no       | none    | photos to display in carousel on invitations; keys are photo numbers and values are public URLs as strings      |
| {colors}         | object { [number]: [hex_code_as_string] } | no       | none    | custom invitation color scheme picked by the couple; keys are color numbers and values are hex codes as strings |

---

### `POST` /events/:eventId/guests

Adds a guest to an event

#### Path parameters

| Parameter | Type    | Required | Default | Description                        |
| :-------- | :------ | :------- | :------ | :--------------------------------- |
| eventId   | integer | yes      | none    | id of the event you are posting to |

#### Query parameters

| Parameter | Type   | Required | Default | Description                                                                     |
| :-------- | :----- | :------- | :------ | :------------------------------------------------------------------------------ |
| firstName | string | yes      | none    | guest first name                                                                |
| lastName  | string | yes      | none    | guest last name                                                                 |
| email     | string | yes      | none    | guest email address; will be the default email to which communications are sent |
| group     | string | no       | none    | name of group                                                                   |

#### Sample response

```json
{
  "guestId": 34
}
```

---

### `GET` /events/:eventId/guests/:guestEmail

Returns a guest, identified by `guestEmail`

#### Path parameters

| Parameter  | Type    | Required | Default | Description                                   |
| :--------- | :------ | :------- | :------ | :-------------------------------------------- |
| eventId    | integer | yes      | none    | id of the event you are retrieving            |
| guestEmail | string  | yes      | none    | email address of the guest you are retrieving |

#### Sample response

```json
{
  "guestId": 12,
  "firstName": "billy",
  "lastName": "joel",
  "email": "local@domain.com",
  "group": "joel family",
  "rsvpStatus": "attending",
  "rvspLastUpdated": "2021-05-23",
  "rsvpNote": "We look forward to attending!"
}
```

---

### `PUT` /events/:eventId/guests/:guestId

Updates a guest

- Multiple fields may be updated in one request
- `rspvLastUpdated` is automatically generated at the time of an update

#### Path parameters

| Parameter | Type    | Required | Default | Description                        |
| :-------- | :------ | :------- | :------ | :--------------------------------- |
| eventId   | integer | yes      | none    | id of the event you are retrieving |
| guestId   | integer | yes      | none    | id of the guest you are updating   |

#### Query parameters

| Parameter   | Type   | Required | Default | Description                                                                     |
| :---------- | :----- | :------- | :------ | :------------------------------------------------------------------------------ |
| {firstName} | string | yes      | none    | guest first name                                                                |
| {lastName}  | string | yes      | none    | guest last name                                                                 |
| {email}     | string | yes      | none    | guest email address; will be the default email to which communications are sent |
| {group}     | string | no       | none    | name of group                                                                   |

---

### `DELETE` /events/:eventId/guests/:guestId

Deletes a guest

#### Path parameters

| Parameter | Type    | Required | Default | Description                        |
| :-------- | :------ | :------- | :------ | :--------------------------------- |
| eventId   | integer | yes      | none    | id of the event you are retrieving |
| guestId   | integer | yes      | none    | id of the guest you are deleting   |

---

### `GET` /events/:eventId/rsvpData

Returns the rsvpData for an event

#### Path parameters

| Parameter | Type    | Required | Default | Description                        |
| :-------- | :------ | :------- | :------ | :--------------------------------- |
| eventId   | integer | yes      | none    | id of the event you are retrieving |

#### Sample response

```json
{
  "eventId": 12,
  "attending": 12,
  "not attending": 3,
  "pending": 50,
  "total": 65,
  "daysToRSVPDeadline": 12
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
  "eventId": 12,
  "groups": ["bridesmaids", "joel family", "byrd family"]
}
```
