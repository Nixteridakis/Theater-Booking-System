# Theater-Booking-System

A movie booking system with different classes interacting with each other. 
The WTC is a Theater group with different Theaters where each is playing different and/or same movies. A user can see which people is attending which movie and how much is the total gross of the Theater at the current time. 

A person can attend a movie and preorder items from the shop. When the ticket is bought the client gets a PDF containing different information about his purchase including the total price (Movie Ticket + Shop Items). 

The project was initially made to read/write from a local MongoDB document(MongoDB Way folder) but at a later time I have recreated it so that it reads from a local JSON file (JSON way folder). Hence anyone can load and view at in their machine without having to preload any classes in a MongoDB document.

Ava tests are included for unit and end-to-end.


## MongoDB way  <br />

In order to see the project with in its full potential the MongoDB way, it needs at least couple of entries from each class. 

### Hierarchical sort of Classes:

 - Theater<br />
 - Movie<br />
 - Attendee<br />
 - Shop Items<br />

### Endpoints to create classes(post):
*Axios requests setup for the root '/'*

**Add Theater:**  '/theater',{name:*String*,totalSales:*Number*,image:*String*}<br />
**Add Movie:**  '/movie',{Name:*String*,Poster:*String*,Year:*Number*,Rating:*Number*,Genre:*Array*,Director:*String*<br />
**Add Person:**  '/person',{name:*String*,age:*Number*,shopped:*Array*}<br />
**Add Item:**  '/item',{name:*String*,price:*Number*}<br />
**Add Movies to a Theater:**'/theater/*TheaterId*/add-movie'{movieId:*MovieId*}<br />
**Add a Person to a Movie:** '/movie/*MovieId*/addPerson',{personId:*PersonId*}<br />
**Add a Item to a Person:**'/person/add-item',{personId:'*PersonId*',itemId:*ItemId*})

## Run <br />

Parallel run of server and frontend

### MongoDB folder
npm install<br />
npm index.js<br />
<br />
### Frontend folder<br />
npm install<br />
npm run serve<br />

<br />
* This project is being developed soon to run with Docker *

