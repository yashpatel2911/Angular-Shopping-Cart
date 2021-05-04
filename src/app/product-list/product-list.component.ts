import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms'
import { CartService } from '../cartService/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  // Injecting cartService and FormBuilder to pass order into cart and create Form.
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {}

  // Main Section
  cartItem: string[] = ['Burger', 'Steak'];
  
  // show Variables are used for conditional Rendering
  showBurgerMenu: boolean = true;
  showSteakMenu: boolean = false;
  
  showBurgerFries: boolean = false;
  showSalad: boolean = true;
  showSteakPotato = false;
  
  // Product Selection for Choosing between Burger and Steak
  productSelector: any;
  
  // for Ordering Burger and Steak
  burgerMenu: any;
  steakMenu : any;

  // CheckBox for Burger(Condiments)
  burgerCheckBox: Array<any> = [
    {name: 'ketchup'},
    {name: 'mustard'},
    {name: 'lettuce'},
    {name: 'tomato'}
  ];

  // Side Selection for Burger
  burgerSides: Array<any> = [
    {name: "Fries", options: ['small', 'large']},
    {name: "Salads", options: ['caesar', 'balsamic']},
  ]

  // Doneness Of Steak
  steakDoneness: string[] = ['rare', 'medium', 'well done'];
  
  // Side Selection for Steak
  steakSides: Array<any> = [
    this.burgerSides[1],
    {name: "Baked Potato", number:1}
  ]

  // Initializing theb FormBuilder for each Section
  ngOnInit() {
    
    // Product Selectior
    this.productSelector = this.formBuilder.group({
      mainItem: [this.cartItem[0]],
    })

    // Burger Menu
    this.burgerMenu = this.formBuilder.group({
      checkArray: this.formBuilder.array([], [Validators.required]),
      sides: [this.burgerSides[1].name],
      options: [this.burgerSides[1].options[0]],
      special: [''],
      numberOfOrder: [1, Validators.min(1)],
      price:[35]
    })

    // Steak menu
    this.steakMenu = this.formBuilder.group({
      doneness: [this.steakDoneness[1]],
      sides:[this.steakSides[0].name],
      options: [this.steakSides[0].options[0]],
      potatoCount: [0, Validators.min(1)],
      special: [""],
      numberOfOrder: [1, Validators.min(1)],
      price:[45]
    })
  }

  // Changing Product so that to render the form for it
  changeProduct(event: Event){

    let value = (event.target as HTMLInputElement).value

    // Changing value in ProductSelector
    let mainItem = this.productSelector.get('mainItem')
    mainItem.patchValue(value.slice(3, value.length));

    // Displaying Burger Form
    if(this.productSelector.value.mainItem ==='Burger'){
      this.showBurgerMenu = true;
      this.showSteakMenu = false;
    }

    // Displaying Steak Form
    else{
      this.showBurgerMenu = false;
      this.showSteakMenu = true;
    }
  }

  // Inserting Check Box Values in CheckArray
  onCheckboxChange(event: Event){
    const checkArray: FormArray = this.burgerMenu.get('checkArray') as FormArray;

    let target = event.target as HTMLInputElement;

    if(target.checked){
      checkArray.push(new FormControl(target.value))
    }

    else{
      let i: number = 0;
      checkArray.controls.forEach((item) => {
        if(item.value ==  target.value){
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  // Selectiong Doneness 
  changeDoneness(event: Event){
    let value = (event.target as HTMLInputElement).value;

    let doneness = this.steakMenu.get('doneness');
    doneness.patchValue(value.slice(3, value.length))
  }

  // Chosing Burger's Side Option
  choseBurgerOptions(event: Event){
    let value = (event.target as HTMLInputElement).value;
    value = value.slice(3, value.length)

    let options = this.burgerMenu.get('options')
    options.patchValue(value);
  }

  // Chosing Steak's Side Option
  choseSteakOptions(event: Event){
    let value = (event.target as HTMLInputElement).value;

    let options = this.steakMenu.get('options')
    options.patchValue(value)
  }

  // Chosing Steak's Side
  choseSteakSides(value: string){

    let sides = this.steakMenu.get('sides');
    sides.patchValue(value)
    
    if(this.steakMenu.get('sides').value === "Salads"){
      this.choseSaladOption()
    }
    else{
      this.chosePotatoOption()      
    }
  }

  //
  // 
  // Below functions are for Conditional Rendering
  //
  //

  chosePotatoOption(){
    this.showSalad = false;
    this.showSteakPotato = true;
    this.showBurgerFries = true;

    this.steakMenu.get('potatoCount').patchValue(1)
    this.steakMenu.get('options').patchValue('')
    this.burgerMenu.get('sides').patchValue(this.burgerSides[0].name)
    this.burgerMenu.get('options').patchValue(this.burgerSides[0].options[0])

  }

  choseSaladOption(){
    this.showSalad = true;
    this.showBurgerFries = false;
    this.showSteakPotato = false;

    this.steakMenu.get('sides').patchValue(this.steakSides[0].name)
    this.burgerMenu.get('sides').patchValue(this.burgerSides[1].name)
    this.burgerMenu.get('options').patchValue(this.burgerSides[1].options[0])
    this.steakMenu.get('options').patchValue(this.steakSides[0].options[0])

    this.steakMenu.get('potatoCount').patchValue(0)
  }

  choseFriesOption(){
    this.showSalad = false;
    this.showSteakPotato = true;
    this.showBurgerFries = true;

    this.steakMenu.get('sides').patchValue(this.steakSides[1].name)
    this.steakMenu.get('potatoCount').patchValue(1)
    this.steakMenu.get('options').patchValue('')
    this.burgerMenu.get('options').patchValue(this.burgerSides[0].options[0])
  }

  // Chosing Burger's Side
  choseBurgerSides(value: string){
    let sides= this.burgerMenu.get('sides');
    sides.patchValue(value)

    if(this.burgerMenu.get('sides').value === "Salads"){
      this.choseSaladOption()
    }
    else{
     this.choseFriesOption()
    }
  }

  // Submiting the Data with checking some conditions
  onSubmit(data: any) {
    data["name"]=this.productSelector.get('mainItem').value

    // Order Number must be greated than 0
    if(data.numberOfOrder > 0){

      // Conditon for Burger
      if(data.name === "Burger" && data.checkArray.length > 0){
        this.cartService.addToCart(data)
      }

      // Condition for Baked Potato
      else{
        if(data.sides === "Baked Potato" && data.potatoCount > 0){
          this.cartService.addToCart(data)
        }
      }
    }

  }
}
