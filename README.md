﻿# angular5-dojo
A tutorial to get started with Angular 5 and explore its possibilities to put together front end applications

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To run this project you will need to have the following installed:

* node (https://nodejs.org/en/)
* npm (bundled with node - https://www.npmjs.com/)
* yarn (https://yarnpkg.com/) - yarn is recommended for anyone at Bath due to proxy issues with npm
* angular cli (https://cli.angular.io/)
* visual studio code (https://code.visualstudio.com/)

Angular command line interface (cli) is exactly what it says on the tin, a cli that will speed up the creation of multiple angular components. To install through command prompt type

```
npm install -g @angular/cli 
OR 
yarn global add @angular/cli
```

### Installing

Create a new project with the Angular cli, navigate to the project folder and start the server

```
ng new angular5-dojo --skip-install (create all the files, don't download the modules yet)*
cd angular5-dojo
npm install OR yarn (downloads the required modules)
ng serve OR yarn start
```

You can see the newly create site on http://localhost:4200/

*You may be wondering why we used the --skip-install flag? Simply put, if you've made a typo or made a mistake in your default configuration, you've just downloaded a chunk of files for nothing. By using skip-install you can check what is created before downloading all the required modules. The angular cli has a lot of flags to speed up the creation of projects that you can explore at a later date but its good practise to check what is created from the start.   

### Visual Studio Code

The argument is out there on the best development IDE but we shall use Visual Studio Code, you should have grabbed a copy as part of the prerequisites. Open it up and drag you project folder in. Your project should now be open and to make your life easier you can go to view > integrated terminal to have a cmd terminal open within your environment. Nice!

### Third party components (Bootstrap 4)

If you've not used bootstrap before you're in for a treat! Bootstrap is a nice library of dynamic components and layout tools that are implemented through html classes. It's not the focal point of this tutorial but we will be using it so let’s install it.

Firstly let’s use npm/yarn to grab the files. There are major differences between 3 and 4 so make sure you have version 4.

```
npm install bootstrap
OR
yarn add bootstrap@4
```

Following that command you will find a reference to bootstrap in the projects package.json file under "dependencies". You will also find the Bootstrap files in the node_modules folder. Its worth having a look through these files and understanding what they do at a later date. Finally we have a reference to include to get it off the ground. In the .angular-cli.json under scripts add in     

```
"../node_modules/bootstrap/dist/css/bootstrap.min.css"
```

Congrats bootstrap styling can now be applied across the project. Now styling is present lets enable bootstraps animations, unfortunalty Bootstrap relies on Jquery for them. However we can get away with jquery-slim. Once again use npm or yarn to pull the packages.

```
npm install jquery-slim
OR
yarn add jquery-slim
```

Finally add these references under scripts in the .angular-cli.json file

```
"../node_modules/jquery/dist/jquery.slim.min.js",
"../node_modules/bootstrap/js/dist/util.js",
"../node_modules/bootstrap/js/dist/collapse.js"
```

Basic animations have now been added. We won’t by directly using these but you will see how bootstrap uses them for dynamic purposes through the Dojo. For more information on bootstrap version 4 https://getbootstrap.com/docs/4.0/getting-started/introduction/

## Components

Angular is completely component based, we can use them for full pages or view items that will be used across multiple pages complying with DRY principles. They generally consist of 4 items.

* A Component.ts file which is the angular structure file.
* A Component.html for what is displayed, .ts binds to this.
* A Component.css or .sass for the html styling
* A Component.spec.ts for test configuration

Now we don’t want to create all four files every time we need a new component, that’s going to become tedious pretty fast so say hello to the cli. Type into the console window…

```
ng g c components/new-plan –dry-run
```

You should see the following created.

```
  create src/app/components/new-plan/new-plan.component.html (28 bytes)
  create src/app/components/new-plan/new-plan.component.spec.ts (643 b)
  create src/app/components/new-plan/new-plan.component.ts (280 bytes)
  create src/app/components/new-plan/new-plan.component.css (0 bytes)
  update src/app/app.module.ts (1597 bytes) 
```

Nice right! By default the cli will create a folder in src/app with the new files and automatically references it in app.module (we shall look into modules later), so let’s break down the cli instruction.

```
ng - angularcli
g - generate me 
c – a “C”omponent
components/new-plan – called new-plan in a directory called components
--dry-run – but only simulate it
```

The syntax is the same for all the angular items that we will create! So we’ve run the command and we’re happy that the component will be created correctly so let’s run the command without the --dry-run flag to actually create the files.

For the purpose of the Dojo we also want another two components called my-plans and my-tags. Have a go at creating them and familiarise yourself with what is created in the files.

## Modules 

### Modules Explained

A module is essentially a packet of references that imports modules to be used by its components and exports its components to other modules. By default every angular app will have an app.module.ts file which is the primary module where everything else is referenced. Large sections of the app can then be broken down into child modules.

Lets have a look at our entry point module app.module.ts.

Firstly at the top of the file you will see a list of imports, anything that will be referenced within the module needs to be included here.

```
import { AppComponent } from './app.component';
import { NewPlanComponent } from './components/new-plan/new-plan.component';
import { MyPlansComponent } from './components/my-plans/my-plans.component';
import { MyTagsComponent } from './components/my-tags/my-tags.component';
```
Under declarations you should be able to see AppComponent and the three previous components created. If not you should add them here now. This essential says this component is apart of this module.

```
declarations: [
    AppComponent,
    NewPlanComponent,
    MyPlansComponent,
    MyTagsComponent
  ],
```

The second section is imports, any module or component that is required by one of the declared components needs to be added here. Some of the common project imports used in most projects can be seen below. We will explain more about them later.

```
imports: [
    BrowserModule,
    FormsModule,
    ….
```
There are also two other sections, Providers and Exports which we shall explore later but are generally not used by the app.module.

### Create a module

Let’s create a module for components that are generally shared across multiple modules. We shall create one using the angular cli using…

```
ng g m shared –dry-run
```

Notice all we’ve done is changed “C”omponent to “M”odule. Once again once you’re happy that will do what’s expected run it without the --dry-run flag.

We have our shared module woop! Now let’s add in some common modules and introduce the exports section. Exports make any component / module contained available to any other module that references this shared module. 

```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [    
    CommonModule,
    FormsModule,
    BrowserModule
  ],
  declarations: []
})
export class SharedModule { }
```

Exports make any component / module contained available to any other module that references this shared module. This means if we have a component declared in a module but not exported, its private! 

Now we have a shared module let’s use it. Head back to app.module.ts and remove the three modules above and replace them with SharedModule. Intelisense should then prompt you to add the import line. If not add...

```
import { SharedModule } from './shared/shared.module';
```

You’ve now created your first module! We won’t be focusing much more on modules through this dojo but they are worth exploring after this session.

## Routing

### Routing configuration

We shall now consider the three components added earlier as “pages” and to access them we need to set up routes to them. 

Head to app.module.ts and in the inputs add** in…

```
RouterModule.forRoot(appRoutes, {useHash : false})
``` 

You should get an intelisense notification to import the router module too. Then under the imports at the top of the file add in a routes array…

```
const appRoutes: Routes = [
  { path: '', component: NewPlanComponent},
  { path: 'new-plan', component: NewPlanComponent },
  { path: 'my-plans', component: MyPlansComponent },
  { path: 'my-tags', component: MyTagsComponent },
];
```

We have now configured our components to routes! If we go to localhost:4200/my-plan we would access the MyPlanComponent and so on. It should also be noted that providing a blank path like the first item in the array will act as the home page so localhost:4200 will now go directly to the NewPlanComponent.

Now you may be thinking this is all nice but what if my module has a lot of components, won’t this become messy. The answer is yes and it is why its good practise to separate out your routing into its own module!*** You can try this now if you want or after the dojo.

** If you were in a sub module and wanted to add in another level of routing, you would use .forChild() instead of .forRoot().

*** the Angular CLI provides more magic here, if you know you will be using routing straight from the start you can add the -–routing to instantly create you a routing module for app.module.ts

```
ng new angular5-dojo –routing
```

### Using Routes

Now we have our routes let’s create a navigation menu using bootstrap. Add the following code into app.component.html. It’s simply the demo navigation menu off the bootstrap examples page… 

```
<nav class="navbar navbar-expand-md navbar-dark bg-dark">
  <a class="navbar-brand" href="#"></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbar">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['/my-plans']">My Plans</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['/my-tags']">My Tags</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['/new-plan']">New Plan</a>
      </li>
    </ul>
  </div>
</nav>

<div id="page-container" class="container">
  <router-outlet></router-outlet>
</div>
```

There are two key parts to take note of in this code, firstly the [routerLink]="['/my-plans']" binding. The routerLink binding essentially sets our a tags href parameter to http://localhost:4200/my-plans. Therefore redirecting to it on a click.

Secondly the router-outlet component <router-outlet></router-outlet>. When we click on the link the component will be loaded inside these brackets since were dealing with a Single Page Application.

```
<div id="page-container" class="container">
  <router-outlet>
    // My plans component.html will be inserted here
  </router-outlet>
</div>
```

With that you should now have a snazzy navigation menu with the routing working. For further information on what bootstraps doing at this point, just ask your dojo master.

## Bindings

### Handlebars

### Brackets

## Reactive Forms


## Services

Services in angular are where we manage our API calls. For the purpose of this Dojo we shall be using JSON Server, a mock API tool so we don’t have to create an API. Firstly though let’s create our service.

### Create a service

Using the cli and the syntax from the previous sections, add a service to app/shared/ called plans. 

We also need to add the service to our module. Pop into app.module.ts and add a reference to MyPlanService under the final declaration type that we will cover, Providers.

A service declared in the providers array is accessible globally, therefore if we had another module, we can access the service without defining it in that module. There is one exception to this but I’ll direct you to the reason why and where at in further resources at the end.

Okay on to the service file, firstly we need to declare the components we require

```
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
```

The HTTP items are self explanatory but he RxJS stands for Reactive Extensions for Javascript and allows for the simplification of asynchronous calls through observables and subscriptions. It’s a fairly large library so to reduce the size of our application, we’re only including the parts we need as opposed to the full library.

Since were using HttpClient ect.. The module needs to know that were using them and they exist within the HTTPModules so Import the following in your app.component.

```
import { HttpClientModule } from '@angular/common/http';
import { HttpModule }      from '@angular/http';
```

Next we need to inject the HTTP Client into the service through the constructor, include the following.

constructor(private _http: HttpClient) {

### HTTPGET

Then let’s add in a function to head off to an API and grab some plans

```
getPlans(): Observable<any> {
  return this._http.get<any>("http://localhost:3000/plans")
    .do(data => {
      // Pre Process Data
    })
    .catch(this.handleError);
}

private handleError(err: HttpErrorResponse) {
  console.log(err.message);
  return Observable.throw(err.message);
}
```

Notice the reference to “any” at the moment. If you don’t know what format the data will be in at first, use any and then map to a class or interface at a later stage before finalising your service. 

We can now set up a subscription to this function in any component that has access to the service so let’s do that. Open my-plans.component and inject the service through the constructor. 

```
(private _myPlansService : MyPlanService){
```

Then we will make a call to get the plans during the components initialisation through a subscription. Within the onInit lifecycle hook add the following.

```
ngOnInit() {
    this._myPlansService.getPlans()
      .subscribe(
        response => {
          this.myPlans = response;
        },
        error => {
          console.log("MyPlans getPlans: FAILED");
        }
      )
  }
````

What will now happen is as the component initialises, an asynchronous call is made to the service which in turn makes a call to the API. It will continue to process through the component until a responses is passed back to the service and then back on to the component. If it’s valid the data will be passed into the response call back or if an error has occurred it will be passed into the error call-back.  

To view what is returned lets quickly throw a for loop into the .html file to see the results.

```
  <div class="row "*ngFor="let plan of myPlans">
    {{plan.id}}
  </div>
```

### JSON-Server

We’re almost there, finally we need to install and start-up our API mocker json-server.js. In the terminal enter

```
npm install -g json-server
Or
Yarn add global json-server
```

Done, grab the db.json provided from ********* file and place it in your projects route directory. To start it open a new terminal window and enter 

```
json-server --watch db.json
```
  
And lastly return to our angular terminal and start the application with the usual yarn start command. If you’ve completed this section correctly you should see the Id’s of our items coming through on the my-plans page.

### HTTPPost

Posting works with promises in exactly the same way as the Get call except we have to pass in some headers and a body. Lets create a function to post a plan back to the json server.
```
postPlan(plan:any): Observable<any> {
	const body = JSON.stringify(plan);
	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	const options = {headers: headers};
	return this._http.post<any>(this.apiRoot + 'plans', body, options)
	  .do(data => {
	  })
	  .catch(this.handleError);
}
```

So firstly we stringify the passed object to the funtion which will act as our body. We then specify what headers to pass back, in this case wer're just passing back the content-type. Finally we wrap the header in an options object, you can explore what else you can do here at a later date. Finally we send of the post call with the data and options.

We can now use the post option within the new-plan component we created earlier, head back and in the onSubmit function add the following subscription
```
this.newPlanService.postPlan(this.resolvePlan())
  .subscribe(
	data => {
	  this.submitted = true;
	  this.newPlanForm.reset();
	  return true;
	},
	error => {
	  console.error('Error!');
	  return Observable.throw(error);
	}
  );
```

Hey presto our form can now submit data correctly. Ultimatly up untill this point we've been a bit naughty, we've been using the any type everywhere which completly removes the power of typescript. If we know what data is being returned from our calls we should define the responses as a class or interface.

###Interfaces

Lets create an Interface through the angular cli, since a plan could be used across the product lets create it in our shared directory under models.
```
ng g i shared/models/IPlan 
```

As a first pass we're going to define are response type as strings and numbers
```
export interface IPlan {
    name: string;
    description: string,
    starting: string,
    finishing: string,
    location: string,
    id: number
}
```

Then to use this interface lets replace the returned type of getPlans to an Observable<IPlan[]> and variable myPlans in the my-plans component to IPlan[]. Lets run the app and head to the My Plans page to see what happens.

All our data loads the so it's working the same so why bother? Well by defining are response types as interfaces we can get on the fly intellisense recommendations and compile time errors within the development environment. The typescript however compiles down to JS so it does not affect the running of the application. 

This can throw up some issues, http get and post responses can get past the interface definitions so objects could be missing fields. They cannot however be bypassed if they are mapped after the call. Mapping also allows us to split out fields if we require it.

Let’s have a quick look at the GetPlans http get call again

```
    return this._http.get<IPlan[]>(this.apiRoot + 'plans')
      .do(data => {})
      .map(results => {
        return results.map(res => {
          return {
            name : res.name,
            description : res.description
          }
        })
       })
      .catch(this.handleError);
```

With the map function we can pick out what fields to pass on to our subscriptions whereas the do function is great for logging or conditional setters. If we want to enforce all fields at of the interface we can define it here.

```
let result : IPlan;
          result = {
            name : res.name,
            description: res.description,
            starting: res.starting,
            finishing: res.finishing,
            location: res.location,
            id: res.id
          }
          return result;
```

It also means that we can check each value of the response to make sure any items that are critical are not null and separate combined data items like date times into separate variables if we need to! 


### Dynamic Configuration

So far we’ve been hard coding our URLs into our services. What happens when we release the application and localhost is no longer our API location? Bring in the configuration files.

Firstly let’s create some JSON files for our configurations, create a folder under src called config followed by three new files called…

```
config.development.json
config.release.json
env.json
```

With this type of set up we can have different configurations for our development and production environments and can switch between them by changing a single parameter in the env.json file.

In env.json add the following…

```
{
  "env": "development"
}
```

Then in config.development.json add…
```
{
  "apiRoot": "http://localhost:3000",
}
```

This should also be mimicked in the config.production.json file to. Next we need to allow access to the new folder. In the angular-cli.json file under assets add in “config” to the array.

For the next step grab the provided app.config.ts file provided and place it under the app directory. Have a look through to see what it’s doing in terms of loading the env.json file and then how it goes on to load up the parameters defined in either of the config files.

Almost there, we now need to add the references to load the config on the loading of the application in the app.module.ts. Open it up and add in the reference to the app.config file we just added, a reference to the APP_INITIALIZER and a quick function to load the config.

```
import { APP_INITIALIZER } from '@angular/core';
import { AppConfig }       from './app.config';

function initConfig(config: AppConfig){
  return () => config.load() 
 }
```

The app requires the APP_INITIALIZER item for the configuration just to let a provider know some work has to be done to set up a provider. Finally we can the AppConfig class and configure the loading in the provider array by adding the items shown below.

```
AppConfig,
    { provide: APP_INITIALIZER, useFactory: initConfig, deps: [AppConfig], multi: true }
```

And with that we can now use our configurations anywhere in the app as if it was a service. Just add a reference in the constructor of a component that requires it, in our case our plans service and pull through the configuration by parameter name

```
constructor( private config : AppConfig){
      this.apiRoot = config.getConfig('apiRoot');
}
```


## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* Angular 5

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning
 

## Authors

* **Raquel Plaza**

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc



