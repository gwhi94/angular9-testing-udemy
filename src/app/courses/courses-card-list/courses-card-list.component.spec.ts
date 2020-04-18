import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';



describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;

  let fixture:ComponentFixture<CoursesCardListComponent>;

  let el:DebugElement;

  
  //async waits for the promise below to complete before running the tests
  beforeEach(async(() => {
    TestBed.configureTestingModule({     
      imports:[
        //we can import all the dependencies here, by importing a module with all the imports in
        CoursesModule
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(CoursesCardListComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;

    });
  }));


  it("should create the component", () => {

      expect(component).toBeTruthy();



  });


  it("should display the course list", () => {

    //passes some courses to the component using the helper function  
    component.courses = setupCourses();

    //need to trigger this in order to update the DOM elements
    fixture.detectChanges();

    //use this to see the element in console
    console.log(el.nativeElement.outerHTML);

    //finds all the cards in the dom by classname
    const cards = el.queryAll(By.css(".course-card"));

    expect(cards).toBeTruthy("Could not find cards");
    expect(cards.length).toBe(12, "Unexpected number of cards in the DOM");

  });


  it("should display the first course", () => {

     //passes some courses to the component using the helper function  
    component.courses = setupCourses();

    //need to trigger this in order to update the DOM elements
    fixture.detectChanges();

    const course = component.courses[0];

    const card = el.query(By.css(".course-card:first-child"));

    const cardTitle = card.query(By.css('mat-card-title'));

    const image = card.query(By.css("img"));

    //using native element to pull out the text content from the DOM
    //then matching it against the first course that we set on line 77
    expect(cardTitle.nativeElement.textContent).toBe(course.titles.description);

    expect(image.nativeElement.src).toBe(course.iconUrl);
 

  });


});


