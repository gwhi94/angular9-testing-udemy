import {async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';




describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let el: DebugElement;
  let coursesService:any;

  const beginnerCourses = setupCourses() 
    .filter(course => course.category == "BEGINNER");

  const advancedCourses = setupCourses() 
  .filter(course => course.category == "ADVANCED");

  const allCourses = setupCourses();

  beforeEach(async(() => {

    //creates the mock service based on the courses service, passing in the methods we need
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses'])

    TestBed.configureTestingModule({
      imports:[
        CoursesModule,
        //prevents animations but still loads the material components
        NoopAnimationsModule
      ],
      //we need the courses service as a dependency. but we mock it here using a spy
      providers:[
        { provide:CoursesService, useValue:coursesServiceSpy }
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        coursesService = TestBed.get(CoursesService);
      });
  }));

  it("should create the component", () => {

    expect(component).toBeTruthy();

  });


  it("should display only beginner courses", () => {
    //the return value method allows to use to return some mock data using the helper function
    //the rxjs of returns an observable of the beginner courses value.
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));
     
    fixture.detectChanges();

    //grab the tabs from the DOM
    const tabs = el.queryAll(By.css(".mat-tab-label"));

    expect(tabs.length).toBe(1, "There is more than one tab showing, should only be 1");
    
  });


  it("should display only advanced courses", () => {

      coursesService.findAllCourses.and.returnValue(of(advancedCourses));

      fixture.detectChanges();

      const tabs = el.queryAll(By.css(".mat-tab-label"));

      expect(tabs.length).toBe(1, "There is more than one tab showing, should only be 1");

  });


  it("should display both tabs", () => {

    coursesService.findAllCourses.and.returnValue(of(allCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));

    expect(tabs.length).toBe(2, "Unexpected number of tabs showing");

  });


  it("should display advanced courses when tab clicked", () => {

    coursesService.findAllCourses.and.returnValue(of(allCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));

    //helper function
    click(tabs[1]);

    fixture.detectChanges();

    const titles = el.queryAll(By.css(".mat-card-title"));

    expect(titles.length).toBeGreaterThan(0);

    expect(titles[0].nativeElement.textContent).toContain("Angular Security Course");

  });

});


