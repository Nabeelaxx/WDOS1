// Personal Details
const form = document.getElementById('bookingForm');
const fnameInput = document.getElementById('fname');
const lnameInput = document.getElementById('lname');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const countryInput = document.getElementById('country');

// Booking Details
const checkInInput = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');
const adultsInput = document.getElementById('adults');
const childrenInput = document.getElementById('children');
const singleInput = document.getElementById('single');
const doubleInput = document.getElementById('double');
const tripleInput = document.getElementById('triple');
const mealsInput = document.getElementById('meals');
const wifiCheckbox = document.getElementById('wifi');
const poolViewCheckbox = document.getElementById('poolView');
const gardenViewCheckbox = document.getElementById('gardenView');
const extraBedCheckbox = document.getElementById('extraBed');
const loyaltyInput = document.getElementById('loyalty');
const promoInput = document.getElementById('promo');

// Adventure Booking
const localAdultsInput = document.getElementById('localAdults');
const localChildrenInput = document.getElementById('localChildren');
const foreignAdultsInput = document.getElementById('foreignAdults');
const foreignChildrenInput = document.getElementById('foreignChildren');
const advTypeSelect = document.getElementById('advType');
const divingOption = document.getElementById('diving');
const natureOption = document.getElementById('nature');
const bunjeeOption = document.getElementById('bunjee');
const zipliningOption = document.getElementById('ziplining');
const adultGuideCheckbox = document.getElementById('adultguide');
const kidGuideCheckbox = document.getElementById('kidguide');

// Buttons
const bookNowBtn = document.getElementById('bookbtn');
const bookAdvBtn = document.getElementById('advbtn');

// Output
const bookOutput = document.getElementById('bookoutput');
const advOutput = document.getElementById('advoutput');

const loyaltyBtn = document.getElementById('checkLoyalty');
// Adding Event Listeners 
// Personal Details
fnameInput.addEventListener('input', () => {
    calculateRoomPrice();
;
});
lnameInput.addEventListener('input', () => {
    calculateRoomPrice();
;
});
emailInput.addEventListener('input', () => {
    calculateRoomPrice();
;
});
phoneInput.addEventListener('input', () => {
    calculateRoomPrice();
;
});
countryInput.addEventListener('input', () => {
    calculateRoomPrice();
;
});

// Booking Details
checkInInput.addEventListener('input', () => {
    calculateRoomPrice();
;
});
checkOutInput.addEventListener('input', () => {
    calculateRoomPrice();
;
});
adultsInput.addEventListener('input', () => {
    calculateRoomPrice();
;
});
childrenInput.addEventListener('input', () => {
    calculateRoomPrice();
;
});
singleInput.addEventListener('input', () => {
    calculateRoomPrice();
;
});
doubleInput.addEventListener('input', () => {
    calculateRoomPrice();
;
});
tripleInput.addEventListener('input', () => {
    calculateRoomPrice();
;
});
mealsInput.addEventListener('input', () => {
    calculateRoomPrice();
;
});
extraBedCheckbox.addEventListener('change', () => {
    calculateRoomPrice();
;
});
loyaltyInput.addEventListener('input', () => {
    calculateRoomPrice();
;
});
promoInput.addEventListener('input', () => {
    calculateRoomPrice();
;
});

// Adventure Booking
localAdultsInput.addEventListener('input', () => {
    calculateAdventurePrice();
;
});
localChildrenInput.addEventListener('input', () => {
    calculateAdventurePrice();
;
});
foreignAdultsInput.addEventListener('input', () => {
    calculateAdventurePrice();
;
});
foreignChildrenInput.addEventListener('input', () => {
    calculateAdventurePrice();
;
});
adultGuideCheckbox.addEventListener('change', () => {
    calculateAdventurePrice();
;
});
kidGuideCheckbox.addEventListener('change', () => {
    calculateAdventurePrice();
;
});

bookNowBtn.addEventListener('click', () => {
    if (validateForm()) {
        updateBookingDetails();
        resetForm();
    }
});

bookAdvBtn.addEventListener('click', () =>{
    if (validateAdvForm()){
        updateAdventureDetails();
        resetForm();
    }
});

loyaltyBtn.addEventListener('click', () =>{
    checkLoyaltyPoints();
});

// Function to calculate stay duration in days
function calculateStayDuration() {
    const checkInDate = new Date(checkInInput.value); // Get the check-in date from the input field
    const checkOutDate = new Date(checkOutInput.value); // Get the check-out date from the input field

    // Calculate the difference between the dates in milliseconds
    const differenceInTime = checkOutDate - checkInDate;

    // Calculate the duration in days
    const stayDuration = differenceInTime / (1000 * 3600 * 24); // Convert milliseconds to days

    return stayDuration;
}

// Function to calculate total room prices
function calculateRoomPrice() {
    // Get duration of stay
    const stayDuration = calculateStayDuration();

    // Get values from input fields
    const singleRooms = parseInt(singleInput.value) || 0;
    const doubleRooms = parseInt(doubleInput.value) || 0;
    const tripleRooms = parseInt(tripleInput.value) || 0;
    const mealsOver5 = parseInt(mealsInput.value) || 0;

    // Get checkbox values
    const hasExtraBed = extraBedCheckbox.checked;

    // Calculate prices for each room type and addons
    const singleRoomPrice = 25000; 
    const doubleRoomPrice = 35000; 
    const tripleRoomPrice = 40000; 
    const mealsAbove5 = 5000; 
    const extraBedPrice = 8000; 

    // Calculate total room prices
    let totalRoomPrice = (singleRooms * singleRoomPrice) + (doubleRooms * doubleRoomPrice) + (tripleRooms * tripleRoomPrice);
    
    // Calculate total addon prices
    if (hasExtraBed) {
        totalRoomPrice += extraBedPrice;
    }

    //Calculate Meals for Kids above 5
    totalRoomPrice += mealsAbove5 * mealsOver5;

    //Calculate total price for the duration of stay
    totalRoomPrice = totalRoomPrice * stayDuration

     // Check if promo code is applied
     const promoCode = promoInput.value;
     const promoDiscount = 0.05; // 5% discount
 
     if (promoCode === 'Promo123') {
         // Apply 5% discount if the promo code is correct
         const discountAmount = totalRoomPrice * promoDiscount;
         totalRoomPrice -= discountAmount;
     }

    bookOutput.innerText = `LKR ${totalRoomPrice}.00`;

    return totalRoomPrice;
}

// Function to update the table with booking details
function updateBookingDetails() {
    const name = `${fnameInput.value} ${lnameInput.value}`;
    const checkInDate = checkInInput.value;
    const checkOutDate = checkOutInput.value;
    const adults = adultsInput.value;
    const children = childrenInput.value;
    const singleRooms = singleInput.value;
    const doubleRooms = doubleInput.value;
    const tripleRooms = tripleInput.value;
    const extraBed = extraBedCheckbox.checked ? 'Yes' : 'No';
    const totalCost = calculateRoomPrice();

    const table = document.getElementById('booklist');

    const newRow = table.insertRow(-1); // Insert a row at the end of the table

    const cells = [
        name,
        checkInDate,
        checkOutDate,
        adults,
        children,      
        singleRooms,
        doubleRooms,
        tripleRooms,
        extraBed,
        `LKR ${totalCost}.00`
    ];

    // Insert cells to the new row
    cells.forEach((cellData, index) => {
        const cell = newRow.insertCell(index);
        cell.textContent = cellData;
    });
    
    alert(`You have successfully placed your booking!`);
}

function resetForm (){
    form.reset();

     // Output
     bookOutput.innerText = 'LKR 0.00';
     advOutput.innerText = 'LKR 0.00';
}

function calculateAdventurePrice() {
    const localAdults = parseInt(localAdultsInput.value) || 0;
    const localChildren = parseInt(localChildrenInput.value) || 0;
    const foreignAdults = parseInt(foreignAdultsInput.value) || 0;
    const foreignChildren = parseInt(foreignChildrenInput.value) || 0;
    

    let totalPrice = 0;

 
        totalPrice += localAdults * 5000;
        totalPrice += localChildren * 2000;
        totalPrice += foreignAdults * 10000;
        totalPrice += foreignChildren * 5000;

        if (adultGuideCheckbox.checked) {
            totalPrice += localAdults * 1000;
        }
        if (kidGuideCheckbox.checked) {
            totalPrice += localChildren * 500;
        }

    advOutput.innerText = `LKR ${totalPrice}.00`;

    return totalPrice;
}

// Function to update the table with adventure booking details
function updateAdventureDetails() {
    const name = `${fnameInput.value} ${lnameInput.value}`;
    const localAdults = localAdultsInput.value;
    const localChildren = localChildrenInput.value;
    const foreignAdults = foreignAdultsInput.value;
    const foreignChildren = foreignChildrenInput.value;
    const adventureType = advTypeSelect.value;
    const divingGuide = adultGuideCheckbox.checked ? 'Yes' : 'No';
    const kidGuide = kidGuideCheckbox.checked ? 'Yes' : 'No';
    const totalCost = calculateAdventurePrice();

    const adventureTable = document.getElementById('advdetails');

    const newRow = adventureTable.insertRow(-1); // Insert a row at the end of the table

    const cells = [
        name,
        adventureType,
        localAdults,
        localChildren,
        foreignAdults,
        foreignChildren,
        divingGuide,
        kidGuide,
        `LKR ${totalCost}.00`
    ];

    // Insert cells to the new row
    cells.forEach((cellData, index) => {
        const cell = newRow.insertCell(index);
        cell.textContent = cellData;
    });

    alert(`You have successfully booked ${adventureType}`);
}

function checkLoyaltyPoints() {
    const singleRooms = parseInt(singleInput.value) || 0;
    const doubleRooms = parseInt(doubleInput.value) || 0;
    const tripleRooms = parseInt(tripleInput.value) || 0;

    const totalRooms = singleRooms + doubleRooms + tripleRooms;

    let loyaltyPoints = 0;

    if (totalRooms > 3) {
        loyaltyPoints = totalRooms * 20;
        // Store loyalty points in local storage
        localStorage.setItem('loyaltyPoints', loyaltyPoints);
    }

    const loyaltyOutput = document.getElementById('loyalty');
    loyaltyOutput.textContent = `Loyalty Points Earned: ${loyaltyPoints}`;
}
// Function to validate the form fields
function validateForm() {
    // Personal Details
    const fname = fnameInput.value.trim();
    const lname = lnameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const country = countryInput.value.trim();

    // Booking Details
    const checkIn = checkInInput.value.trim();
    const checkOut = checkOutInput.value.trim();
    const adults = adultsInput.value.trim();
    const singleRooms = parseInt(singleInput.value) || 0;
    const doubleRooms = parseInt(doubleInput.value) || 0;
    const tripleRooms = parseInt(tripleInput.value) || 0;

    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation logic
    if (fname === '') {
        alert('Please enter your First Name.');
        fnameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    }

    if (lname === '') {
        alert('Please enter your Last Name.');
        return false;
    }

    if (email === '' || !emailPattern.test(email)) {
        alert('Please enter a valid Email Address.');
        return false;
    }

    if (phone === '') {
        alert('Please enter your Phone Number.');
        return false;
    }

    if (country === '') {
        alert('Please enter your Country.');
        return false;
    }

    if (checkIn === '') {
        alert('Please select the Check-In Date.');
        return false;
    }

    if (checkOut === '') {
        alert('Please select the Check-Out Date.');
        return false;
    }

    if (!adults > 0){
        alert('Please enter at least one adult.');
        return false;
    }

    if (!(singleRooms > 0 || doubleRooms > 0 || tripleRooms > 0)) {
        alert('Please select atleast one room.');
        return false;
    }

    // If all validations pass, return true
    return true;
}

// Function to validate the form fields
function validateAdvForm() {
    // Personal Details
    const fname = fnameInput.value.trim();
    const lname = lnameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const country = countryInput.value.trim();

    // Adventure Booking
    const localAdults = parseInt(localAdultsInput.value);
    const localChildren = parseInt(localChildrenInput.value);
    const foreignAdults = parseInt(foreignAdultsInput.value);
    const foreignChildren = parseInt(foreignChildrenInput.value);
    const advType = advTypeSelect.value;

    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation logic
    if (fname === '') {
        alert('Please enter your First Name.');
        return false;
    }

    if (lname === '') {
        alert('Please enter your Last Name.');
        return false;
    }

    if (email === '' || !emailPattern.test(email)) {
        alert('Please enter a valid Email Address.');
        return false;
    }

    if (phone === '') {
        alert('Please enter your Phone Number.');
        return false;
    }

    if (country === '') {
        alert('Please enter your Country.');
        return false;
    }

    // Validation logic for adventure booking details
    if (advType === 'none') {
        alert('Please select an Adventure Type.');
        return false;
    }

    if (!(localAdults > 0 || localChildren > 0 || foreignAdults > 0 || foreignChildren > 0 ))  {
        alert(`Please enter atleast one person for ${advType}`);
        return false;
    }


    // If all validations pass, return true
    return true;
}


