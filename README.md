# Theater-Booking-System

A movie booking system with different classes interacting with each other. 
The WTC is a Theater group with different Theaters where each is playing different and/or same movies. A user can see which people is attending which movie and how much is the total gross of the Theater at the current time. 

A person can attend a movie and preorder items from the shop. When the ticket is bought the client gets a PDF containing different information about his purchase including the total price (Movie Ticket + Shop Items). 

The project was initially made to read/write from a local MongoDB document(MongoDB Way folder) but at a later time I have recreated it so that it reads from a local JSON file (JSON way folder). Hence anyone can load and view at in their machine without having to preload any classes in a MongoDB document.


MongoDB way  
————————
In order to see the project with in its full potential the MongoDB way, it needs at least couple of entries from each class. 

Hierarchical sort of Classes:

Theater
Movie
Attendee
Shop Items

Endpoints:

Add Theater: '/theater',{name:*String*,totalSales:*Number*,image:*String*}
Add Movie: '/movie',{Name:*String*,Poster:*String*,Year:*Number*,Rating:*Number*,Genre:*Array*,Director:*String*