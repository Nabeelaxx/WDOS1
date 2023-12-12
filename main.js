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
const paraglidingOption = document.getElementById('paragliding');
const adultGuideCheckbox = document.getElementById('adultguide');
const kidGuideCheckbox = document.getElementById('kidguide');

// Buttons
const bookNowBtn = document.getElementById('bookbtn');
const bookAdvBtn = document.getElementById('advbtn');
const confirmNowBtn = document.getElementById('confirmRoom');
const confirmAdvBtn = document.getElementById('confirmAdv');
const roomFavBtn = document.getElementById('roomfavbtn');
const advFavBtn = document.getElementById('advfavbtn');

// Output
const bookOutput = document.getElementById('bookoutput');
const advOutput = document.getElementById('advoutput');
const totalOutput = document.getElementById('totalOutput');
const popup = document.getElementById("popupScreen");
const advPopup = document.getElementById('popupScreen2');
const loyaltyBtn = document.getElementById('checkLoyalty');
const confirmAdvMsg = document.getElementById('confirmMsg');
const bookTable = document.getElementById('bookdetails');
const advTable = document.getElementById('advdetails');

const today = new Date().toISOString().split('T')[0];

checkInInput.min = today;

// Adding Event Listeners 
window.addEventListener('load', () => {
    localStorage.setItem('loyaltyPoints', 0);
});

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
    calculateStayDuration();
;
});

// Booking Details
checkInInput.addEventListener('change', () => {
    calculateRoomPrice();
    minCheckOutDate();

    if (checkOutInput.value < this.value) {
        checkOutInput.value = this.value;
    }
});
checkOutInput.addEventListener('change', () => {
    calculateRoomPrice();
    if (this.value < checkInInput.value) {
        checkOutInput.value = checkInInput.value;
    } 
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
        openPopup();
    }
});

confirmNowBtn.addEventListener('click', () => {
    updateBookingDetails();
    resetForm();
    checkLoyaltyPoints();
    closePopup();
    calculateTotalPrices();
});

bookAdvBtn.addEventListener('click', () =>{
    if(validateAdvForm()){
        openAdvPopup();
    }
});

confirmAdvBtn.addEventListener('click', () => {
    updateAdventureDetails();
    resetForm();
    closeAdvPopup();
    calculateTotalPrices();
});

loyaltyBtn.addEventListener('click', () =>{
    displayLoyaltyPoints();
});


roomFavBtn.addEventListener('click', () => {
    if (validateForm()){
        saveRoomFav();
    }
});
advFavBtn.addEventListener('click', () =>{
    if(validateAdvForm()){
        saveAdvFav();
    }
});

function openPopup(){
    popup.style.display = 'flex';
}

function closePopup(){
    popup.style.display = 'none';
    bookTable.scrollIntoView({ behavior : 'smooth', block : 'center'});
}

function openAdvPopup(){
    advPopup.style.display = 'flex';
    confirmAdvMsg.textContent = `You have successfully placed a booking for ${advTypeSelect.value}`;
}

function closeAdvPopup(){
    advPopup.style.display = 'none';
    advTable.scrollIntoView({ behavior : 'smooth', block : 'center'});
}

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

function minCheckOutDate(){
    const chooseDate = new Date(checkInInput.value);
    chooseDate.setDate(chooseDate.getDate() + 1);
    const minCheckOutdate = chooseDate.toISOString().split('T')[0];
    checkOutInput.min = minCheckOutdate;
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
    const adults = adultsInput.value || 0;
    const children = childrenInput.value || 0;
    const singleRooms = singleInput.value || 0;
    const doubleRooms = doubleInput.value || 0;
    const tripleRooms = tripleInput.value || 0;
    const extraBed = extraBedCheckbox.checked ? 'Yes' : 'No';
    const totalCost = bookOutput.innerText;

    const table = document.getElementById('booklist');

    
    const details = {
        name: name,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        adults: adults,
        children: children,
        single: singleRooms,
        double: doubleRooms,
        triple: tripleRooms,
        extraBed: extraBed,
        totalCost: totalCost,
    };
    
    const labels = {
        name: 'Name',
        checkInDate: 'Check-in Date',
        checkOutDate: 'Check-Out Date',
        adults: 'No. of Adults',
        children: 'No. of Children',
        kids: 'Above 5 Years',
        single: 'Single Rooms',
        double: 'Double Rooms',
        triple: 'Triple Rooms',
        wifi: 'WiFi',
        pool: 'Pool View',
        garden: 'Garden View',
        extraBed: 'Extra Bed',
        promocode: 'Promo Code',
        totalCost: 'Total Cost',
    };
    
    const newRow = table.insertRow(-1);
    for (const detail in details) {
        const cell = newRow.insertCell();
        cell.textContent = details[detail];
        cell.setAttribute('data-label', labels[detail]);
    };
}

function resetForm (){
    form.reset();

     // Output
     bookOutput.innerText = 'LKR 0.00';
     advOutput.innerText = 'LKR 0.00';
     totalOutput.innerText = 'LKR 0.00';

}

function calculateAdventurePrice() {
    const localAdults = parseInt(localAdultsInput.value) || 0;
    const localChildren = parseInt(localChildrenInput.value) || 0;
    const foreignAdults = parseInt(foreignAdultsInput.value) || 0;
    const foreignChildren = parseInt(foreignChildrenInput.value) || 0;
    

    let totalAdvPrice = 0;

 
        totalAdvPrice += localAdults * 5000;
        totalAdvPrice += localChildren * 2000;
        totalAdvPrice += foreignAdults * 10000;
        totalAdvPrice += foreignChildren * 5000;

        if (adultGuideCheckbox.checked) {
            totalAdvPrice += localAdults * 1000;0
        }
        if (kidGuideCheckbox.checked) {
            totalAdvPrice += localChildren * 500;
        }

    advOutput.innerText = `LKR ${totalAdvPrice}.00`;

    return totalAdvPrice;
}

// Function to update the table with adventure booking details
function updateAdventureDetails() {
    const name = `${fnameInput.value} ${lnameInput.value}`;
    const localAdults = localAdultsInput.value || 0;
    const localChildren = localChildrenInput.value || 0;
    const foreignAdults = foreignAdultsInput.value || 0;
    const foreignChildren = foreignChildrenInput.value || 0;
    const adventureType = advTypeSelect.value;
    const divingGuide = adultGuideCheckbox.checked ? 'Yes' : 'No';
    const kidGuide = kidGuideCheckbox.checked ? 'Yes' : 'No';
    const totalCost = advOutput.innerText;

    const adventureTable = document.getElementById('advlist');
    
    const details = {
        name: name,
        dropdown: adventureType,
        localadults: localAdults,
        localkids: localChildren,
        foreignadults: foreignAdults,
        foreignkids: foreignChildren,
        DiveAdult: divingGuide,
        DiveKids: kidGuide,
        totalcost: totalCost,
    };

    const labels = {
        name: 'Name',
        dropdown: 'Adventures',
        localadults: 'Local Adults',
        localkids: 'Local Kids',
        foreignadults: 'Foreign Adults',
        foreignkids: 'Foreign Kids',
        DiveAdult: 'Guide for Diving (Adults)',
        DiveKids: 'Guide for Diving (Kids)',
        totalcost: 'Total Cost',
    };

    const newRow = adventureTable.insertRow(-1);
    for (const detail in details) {
        const cell = newRow.insertCell();
        cell.textContent = details[detail];
        cell.setAttribute('data-label', labels[detail]);
    };
}

// Function to calculate the total prices from both tables
function calculateTotalPrices() {
    // Get all rows from bookTable and advTable
    const allRows = document.querySelectorAll('#bookdetails tbody tr');
    const advallRows = document.querySelectorAll('#advdetails tbody tr');

    let totalRoomPrice = 0;
    let totalAdvPrice = 0;

    // Calculate total price from overallTable
    allRows.forEach(row => {
        const totalCostCell = row.querySelector('[data-label="Total Cost"]');
        const totalPriceText = totalCostCell.textContent.trim().replace('LKR', '').trim();
        const totalPrice = parseFloat(totalPriceText.replace(',', '')); // Remove commas and convert to float
        if (!isNaN(totalPrice)) {
            totalRoomPrice += totalPrice;
        }
    });

    // Calculate total price from advOverallTable
    advallRows.forEach(row => {
        const totalCostCell = row.querySelector('[data-label="Total Cost"]');
        const totalPriceText = totalCostCell.textContent.trim().replace('LKR', '').trim();
        const totalPrice = parseFloat(totalPriceText.replace(',', '')); // Remove commas and convert to float
        if (!isNaN(totalPrice)) {
            totalAdvPrice += totalPrice;
        }
    });

    // Calculate total of both prices
    const totalBothPrices = totalRoomPrice + totalAdvPrice;
    totalOutput.textContent = `LKR ${totalBothPrices}.00`;
     
    return totalBothPrices;
}

function checkLoyaltyPoints() {
    const table = document.getElementById('booklist');
    const lastRow = table.rows[table.rows.length - 1]; // Get the last row from the table

    // Extract the values from the last row
    const singleRooms = parseInt(lastRow.cells[6].textContent) || 0;
    const doubleRooms = parseInt(lastRow.cells[7].textContent) || 0;
    const tripleRooms = parseInt(lastRow.cells[8].textContent) || 0;

    const totalRooms = singleRooms + doubleRooms + tripleRooms;

    const existingLoyaltyPoints = parseInt(localStorage.getItem('loyaltyPoints')) || 0;
    let loyaltyPoints = 0;


    if (totalRooms > 3) {
        loyaltyPoints = totalRooms * 20;
        loyaltyPoints += existingLoyaltyPoints;

        // Store loyalty points in local storage
        localStorage.setItem('loyaltyPoints', loyaltyPoints);
    }
}

function displayLoyaltyPoints() {
    const storedLoyaltyPoints = localStorage.getItem('loyaltyPoints') || 0;

    if (storedLoyaltyPoints) {
        const loyaltyOutput = document.getElementById('loyalty');
        loyaltyOutput.textContent = `Loyalty Points Earned: ${storedLoyaltyPoints}`;
    }
    alert("Congratulations on earning Loyalty Points!");
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
        lnameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    }

    if (email === '' || !emailPattern.test(email)) {
        alert('Please enter a valid Email Address.');
        emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    }

    if (phone === '') {
        alert('Please enter your Phone Number.');
        phoneInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    }

    if (country === '') {
        alert('Please enter your Country.');
        countryInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    }

    if (checkIn === '') {
        alert('Please select the Check-In Date.');
        checkInInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    }

    if (checkOut === '') {
        alert('Please select the Check-Out Date.');
        checkOutInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    }

    if (!adults > 0){
        alert('Please enter at least one adult.');
        adultsInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    }

    if (!(singleRooms > 0 || doubleRooms > 0 || tripleRooms > 0)) {
        alert('Please select atleast one room.');
        singleInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
        fnameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    }

    if (lname === '') {
        alert('Please enter your Last Name.');
        lnameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    }

    if (email === '' || !emailPattern.test(email)) {
        alert('Please enter a valid Email Address.');
        emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    }

    if (phone === '') {
        alert('Please enter your Phone Number.');
        phoneInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    }

    if (country === '') {
        alert('Please enter your Country.');
        countryInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    }

    // Validation logic for adventure booking details
    if (advType === 'none') {
        alert('Please select an Adventure Type.');
        advTypeSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    }

    if (!(localAdults > 0 || localChildren > 0 || foreignAdults > 0 || foreignChildren > 0 ))  {
        alert(`Please enter atleast one person for ${advType}`);
        localAdultsInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    }

    // If all validations pass, return true
    return true;
}

function saveRoomFav(){
    const roomBooking = {
        checkInDate: checkInInput.value,
        checkOutDate: checkOutInput.value,
        singleRooms: singleInput.value || 0,
        doubleRooms: doubleInput.value || 0,
        tripleRooms: tripleInput.value || 0,
        adults: adultsInput.value || 0,
        children: childrenInput.value || 0,
        mealsOver5: mealsInput.value || 0,
        wifi: wifiCheckbox.checked ? 'Yes' : 'No',
        extraBed: extraBedCheckbox.checked ? 'Yes' : 'No',
        poolView: poolViewCheckbox.checked ? 'Yes' : 'No',
        gardenView: gardenViewCheckbox.checked ? 'Yes' : 'No',
        promoCode: promoInput.value,
    }
    alert("Your choices for rooms have been favourited!");
    localStorage.setItem('favouriteRoomBooking', JSON.stringify(roomBooking));
};

function saveAdvFav(){
    const advBooking = {
        localAdults: localAdultsInput.value || 0,
        localChildren: localChildrenInput.value || 0,
        foreignAdults: foreignAdultsInput.value || 0,
        foreignChildren: foreignChildrenInput.value || 0,
        adultGuide: adultGuideCheckbox.checked ? 'Yes' : 'No',
        kidGuide: kidGuideCheckbox.checked ? 'Yes' : 'No',
       
    }
    alert("Your choices for adventure have been favourited!");
    localStorage.setItem('favouriteAdvBooking', JSON.stringify(advBooking));
};