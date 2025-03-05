function sliderFn() {
	const slides = document.querySelectorAll(".slide");
	const slidesWrapper = document.querySelector(".slider-wrapper");
	let currentSlide = 0;

	function renderSlides() {
		slides.forEach((slide, index) => {
			if (index === currentSlide) {
				slide.classList.add("show-slide");
			} else {
				slide.classList.remove("show-slide");
			}
		});
	}

	function goToNextSlide() {
		if (currentSlide === slides.length - 1) {
			currentSlide = 0;
		} else {
			currentSlide++;
		}
		renderSlides();
	}

	// 2. ლექციაზე შექმნილ სლაიდერს დავამატოთ:
	//    2.1. დავამატოთ სლაიდების ავტომატური ცვლილება 5 წამიანი ინტერვალით
	//    2.2. როდესაც ავტომატურად ხდება სლაიდების შეცვლა თუ მაუსს მივიტან სურათთან, ავტომატური სლაიდი გაჩერდეს.
	//    2.3. თუ მაუსი მიტანილი მაქვს სურათზე და შემდეგ გამოვწევ სურათიდან, ავტომატური სლაიდი გაგრძელდეს. მოუსმინეთ  mouseenter, mouseleave  ივენთებს

	let slideInterval = setInterval(goToNextSlide, 5000);

	slidesWrapper.addEventListener("mouseenter", () => {
		if (slideInterval) {
			// console.log("clear");
			clearInterval(slideInterval);
			slideInterval = null;
		}
	});
	slidesWrapper.addEventListener("mouseleave", () => {
		// console.log("set");
		slideInterval = setInterval(goToNextSlide, 5000);
	});
}

sliderFn();

// 1. setTimeout ან setInterval - ის გამოყენებით გააკეთეთ საათი რომელიც იმუშავებს როგორც ნამდვილი სააათი. გამოიყენეთ ატვირთული სურათი (საათი.png).
const clock = document.querySelector("#clock");
const showTime = () => {
	const date = new Date();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	clock.textContent = `${hours.toString().padStart(2, 0)}:${(
		minutes + ""
	).padStart(2, 0)}:${(seconds + "").padStart(2, 0)}`;

	// clock.textContent = `${hours}:${minutes}:${seconds}`;
};
showTime();
setInterval(showTime, 1000);

//  3*(optional) დავამატოთ მარტივი countdown რომელიც გვიჩვენებს მომდევნო ლექციამდე (5 მარტი, 20:00) დარჩენილ დროს (დღე, საათი, წუთი)

const countdown = document.querySelector("#countdown");
const showCountdown = () => {
	const currentDate = new Date();
	const futureDate = new Date("Mar 12, 2025 20:00:00");
	const diff = futureDate - currentDate;

	const days = Math.floor(diff / 1000 / 60 / 60 / 24);
	const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
	const minutes = Math.floor(diff / 1000 / 60) % 60;
	const seconds = Math.floor(diff / 1000) % 60;

	countdown.textContent = `${days} days ${hours} hours ${minutes} minutes`;
};

showCountdown();

setInterval(showCountdown, 60000);

const closeModalBtn = document.querySelector(".close-modal");
const closeDialogBtn = document.querySelectorAll(".close-dialog");
closeDialogBtn.forEach((btn) => {
	btn.addEventListener("click", () => {
		const dialog = btn.closest("dialog");
		dialog.close();
	});
});

closeModalBtn.addEventListener("click", () => {
	const modal = closeModalBtn.closest(".modal");
	modal.classList.remove("active");
});
function formValidation() {
	const form = document.querySelector("#form");
	const emailInput = document.querySelector("#email");
	const nameInput = document.querySelector("#name");
	const passwordInput = document.querySelector("#password");
	const ageInput = document.querySelector("#age");
	const modal = document.querySelector("#reg-confirmation");
	const dialog = document.querySelector("#confirmation-dialog");

	const showErrorMessage = (input, message) => {
		input.closest(".form-group").classList.remove("success");
		input.closest(".form-group").classList.add("error");
		input.closest(".form-group").querySelector(".error-message").textContent =
			message;
	};
	const showSuccessMessage = (input, message) => {
		input.closest(".form-group").classList.remove("error");
		input.closest(".form-group").classList.add("success");
		input.closest(".form-group").querySelector(".error-message").textContent =
			message;
	};

	const isNameValid = () => {
		const val = nameInput.value.trim();
		if (val === "") {
			showErrorMessage(nameInput, "Name is required");
			return false;
		} else if (val.length < 3) {
			showErrorMessage(nameInput, "Name is too short");
			return false;
		} else {
			showSuccessMessage(nameInput, "Name is valid");
			return true;
		}
	};
	const isEmailValid = () => {
		const val = emailInput.value.trim();
		const emailRegExp =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (val === "") {
			showErrorMessage(emailInput, "Email is required");
			return false;
		} else if (!emailRegExp.test(val)) {
			showErrorMessage(emailInput, "Email is not correct format");
			return false;
		} else if (!/@gmail\.com$/.test(val)) {
			showErrorMessage(emailInput, "Email must be gmail.com");
			return false;
		} else {
			showSuccessMessage(emailInput, "Email is valid");
			return true;
		}
	};
	const isAgeValid = () => {
		const val = ageInput.value.trim();
		// console.log(typeof val);
		// Number(val); => 5
		if (Number(val) < 0 || Number(val) > 10) {
			showErrorMessage(ageInput, "Age must be between 0 and 10");
			return false;
		} else {
			showSuccessMessage(ageInput, "Age is valid");
			return true;
		}
	};

	nameInput.addEventListener("input", isNameValid);
	emailInput.addEventListener("input", isEmailValid);
	ageInput.addEventListener("input", isAgeValid);

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const nameValid = isNameValid();
		const emailValid = isEmailValid();
		const ageValid = isAgeValid();

		if (nameValid && emailValid && ageValid) {
			console.log("Form is valid");
			//  form.submit();
			// modal.classList.add("active");
			dialog.showModal();
		}
		// form.submit()
		// form.reset()
	});
}
formValidation();
