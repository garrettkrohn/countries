Countries example project

This project is meant to serve as a full stack example project for the Accelerated Engineer Program at Kipsu.  The 
application ui is pretty ugly, but it will give you a good idea of what is going on in the code to apply to your 
own projects.  

=====
Project architecture

-----
Front End

The front end is build with Vite implementing React with Typescript.  All of the front end lives in the "app" folder.
Within that folder, there are a number of configuration files, a public folder, and an src folder.  The src folder
has all of our code for the frontend.
- components: holds the pages for the application sorted into folders
- routes: holds all of the configuration for tanstack router.  All of this is put together and implemented in the 
app.tsx file, having it in a separate file allows for a leaner app.tsx file
- services: holds two different services.  Atoms is a jotai (state management library) file creating the global states
that can be accessed and changed throughout the application
- The api files hold the functions to make the api calls.  They are exported and will be called elsewhere in the 
application via tanstack query hooks.  
- The utilities folder has a couple of different files.  The error and loading components are simple reusable components
that are usable wherever you need a loading or error screen.  The constants has a couple of constants that are exported
like the routes that will be used in the navigation bar or regions if you were to ever implement a filter drop down to 
the countries page

-----
Back End

The back end of this application is written with PHP using Symfony as the framework and it is all in the server folder.
There is a lot more boilerplate here compared to the front end, I'll highlight the important folders. 
- migrations: This folder is where doctrine puts all of the database migration files that are generated
- test: if you write unit tests, this is where they are held
- docker-compose.yml: this is the file that has all of the configuration for creating the docker container for the 
backend
- Vendor: the command "composer install" installs all of the dependencies for symfony, much like npm install on the 
front end, it stores everything in this folder.  To save space and time, this folder should be git ignored.
- src folder has all of our source code.

-----
Backend Layers

This project follows a specific layering pattern to keep the code clean, easy to debug and maintain.  Before going
through each folder, I'll outline an api call to get an idea of the layers and what their function is.


We'll use the getCountries() function in the CountryController as the example
- Controller is the first place where an api call comes in from the front end or postman
  - The controller may or may not perform validation on the request data coming in
- The controller will call a function in a service
- Service is where all of the business logic will happen in the application
- In the service layer, repositories are used to get entities from the database.
- Once the entities are retrieved, they need to be transformed into DTOs that can be sent back to the front end
- I used a transformFromObject and transformFromObjects setup extending AbstractMultiTransformer that allows you
to create the transformFromObject function in each service and you will be able to easily transform one or more 
objects.
- the transformed object is sent back to the controller where it is converted into a json, and sent back to the 
front end

-----
Backend Architecture

(within the src folder)
- controller hols all of the controllers.  
  - ApiController should be extended by all of the specific controllers, it provides the validation logic
  - Controller has a health checker that is nice when checking if the container is up and running
  - Other specific controllers
- Dto
  - Incoming: this is where any incoming DTOs are held, these are named after the action that it is performing
  - Outgoing: this is where the outgoing DTOs are held to be sent to the front end
- Entity
  - This is a Doctrine folder that holds all of the entities that are reflected as tables in the database
- Exception
  - Utility folder with exceptions
- Repository
  - This is another Doctrine folder that is used to access the entities (for each entity that is created a repository
  is also created)
  - Serialization
    - Utility folder that has some validation logic as well as json serialization
  - Service
    - This folder holds all of the business logic for the application


















