import { Component, OnInit } from "@angular/core";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import Swiper, { Navigation, Pagination, Autoplay, EffectFade } from "swiper";
Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
  highlights = [
    {
      title: "Payroll system",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ....",
      img: "assets/un-img/payroll-100.jpg",
    },
    {
      title: "Payment Gateway",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ....",
      img: "assets/un-img/payment-100.jpg",
    },
    {
      title: "Mobile App",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ....",
      img: "assets/un-img/mobile-100.jpg",
    },
    {
      title: "Self Services",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ....",
      img: "assets/un-img/self-100.jpg",
    },
    {
      title: "Chat bot",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ....",
      img: "assets/un-img/chat-100.jpg",
    },
    {
      title: "Complaince check",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ....",
      img: "assets/un-img/complaince-100.jpg",
    },
    {
      title: "Member Registration",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ....",
      img: "assets/un-img/member-100.jpg",
    },
    {
      title: "24/7 Support",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ....",
      img: "assets/un-img/24-100.jpg",
    },
  ];
  videos = [
    {
      title: "Logging in to the Portal",
      content:
        "This video will show you how to login to the new Employer Portal",
      link: "https://www.youtube.com/embed/tG-YcEne_3o",
    },
    {
      title: "Transition your User Account to the new Portal",
      content:
        "This video will show you how to migrate your user account from the old Employer portal to the new Employer Portal",
      link: "https://www.youtube.com/embed/joeMVYfFMi0",
    },
    {
      title: "Submit Contribution Schedule by uploading file",
      content:
        "This video will show you how to submit your contribution schedule text files using the new Employer Portal",
      link: "https://www.youtube.com/embed/H4FoXMhiT4c",
    },
    {
      title: "Submit Contribution Schedule by entering data",
      content:
        "This video will show you how to submit your contribution schedule by manually entering data directly into the Employer Portal",
      link: "https://www.youtube.com/embed/JSYgvNoRGZo",
    },
  ];
  medias = [
    {
      title: "Assistance Employer Portal Sub...",
      subtitle: "COVID -19",
      date: "Posted on 10 Aug, 2020 | 10,220 Users Following",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolorlit...",
      img: "assets/un-img/media-img.jpg",
    },
    {
      title: "Introduction to New Payroll system",
      subtitle: "COVID -19",
      date: "Posted on 10 Aug, 2020 | 10,220 Users Following",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolorlit...",
      img: "assets/un-img/media-img.jpg",
    },
  ];

  testimonials = [
    {
      name: "Thomsan",
      designation: "CEO., FELIX INCORP",
      date: "Dated: 10 Aug, 2020",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum ur adipiscing elit Lorem ipsumur adipiscing elit Lorem ipsum  ur adipiscing elit Lorem ipsumur adipiscing elit Lorem ipsumur adipiscing elit Lorem ipsumur adipiscing elit Lorem ipsumdolorlit...consectetur adipiscing elit Lorem ipsum dolorlit......",
      img: "assets/un-img/media-img.jpg",
    },
    {
      name: "Thomsans",
      designation: "CEO., INCORP",
      date: "Dated: 10 Aug, 2020",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum ur adipiscing elit Lorem ipsumur adipiscing elit Lorem ipsum  ur adipiscing elit Lorem ipsumur adipiscing elit Lorem ipsumur adipiscing elit Lorem ipsumur adipiscing elit Lorem ipsumdolorlit...consectetur adipiscing elit Lorem ipsum dolorlit......",
      img: "assets/un-img/media-img.jpg",
    },
  ];
  clients = [
    { img: "assets/un-img/adobe.jpg" },
    { img: "assets/un-img/cisco.jpg" },
    { img: "assets/un-img/alexa.jpg" },
    { img: "assets/un-img/bmw.jpg" },
    { img: "assets/un-img/disney.jpg" },
    { img: "assets/un-img/peugeot.jpg" },
    { img: "assets/un-img/verizon.jpg" },
    { img: "assets/un-img/macrumors.jpg" },
    { img: "assets/un-img/lacoste.jpg" },
    { img: "assets/un-img/vodafone.jpg" },
  ];
  galleries = [
    {
      title: "New Event",
      date: "Posted on 10 Aug, 2020   |   10,220 Users Following",
      img: "assets/un-img/self-100.jpg",
    },
    {
      title: "Introduction to New payroll system",
      date: "Posted on 10 Aug, 2020   |   10,220 Users Following",
      img: "assets/un-img/media-img.jpg",
    },
    {
      title: "New Member Event",
      date: "Posted on 10 Aug, 2020   |   10,220 Users Following",
      img: "assets/un-img/self-100.jpg",
    },
    {
      title: "Fiji One Talk Business",
      date: "Posted on 10 Aug, 2020   |   10,220 Users Following",
      img: "assets/un-img/media-img.jpg",
    },
  ];

  selectedGallery = {
    title: "Introduction to New payroll system",
    date: "Posted on 10 Aug, 2020   |   10,220 Users Following",
    img: "assets/un-img/media-img.jpg",
  };
  sliders = [
    {
      title: "Welcome to Employer E-Service Portal",
      content:
        "Portal is the one-stop-shop solution for all measures & matters that Employers would require when transaction with FNPF",
      img: "assets/un-img/dravuni-island-fiji-islands.jpg",
      button: "Know More",
      action: "",
    },
  ];

  homeData = {
    plstContent: [
      {
        strContent: "",
        link: "",
      },
    ],
  };
  homePageData = {
    highlights: [],
    videos: [],
    medias: [],

    testimonials: [],
    clients: [],
    galleries: [],

    selectedGallery: {
      title: "",
      date: "",
      img: "",
    },
    sliders: [
      {
        title: "",
        content: "",
        img: "",
        button: "",
        action: "",
      },
    ],
  };
  constructor(public data: DataService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.initSwiper();
    }, 500);
    this.getHomeContent();
  }

  initSwiper() {
    // Swiper for Media
    const mainSwipper = new Swiper(".main-slider-container", {
      // loop: true,
      slidesPerView: 1,
      spaceBetween: 16,
      effect: "fade",
      fadeEffect: { crossFade: true },
      // virtualTranslate: true,
      speed: 1500,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      // Navigation arrows
      navigation: {
        nextEl: ".ms-button-next",
        prevEl: ".ms-button-prev",
      },
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true
      // },
    });
    // Swiper for Video
    const videoSwipper = new Swiper(".video-container", {
      // loop: true,
      slidesPerView: 1,
      spaceBetween: 32,
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 4,
        },
      },
      // Navigation arrows
      navigation: {
        nextEl: ".video-button-next",
        prevEl: ".video-button-prev",
      },
    });
    // Swiper for Media
    const mediaSwipper = new Swiper(".media-container", {
      // loop: true,
      slidesPerView: 1,
      spaceBetween: 64,
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      },
      // Navigation arrows
      navigation: {
        nextEl: ".media-button-next",
        prevEl: ".media-button-prev",
      },
    });
    // Swiper for Media
    const testimonialSwipper = new Swiper(".testimonial-container", {
      // loop: true,
      slidesPerView: 1,
      spaceBetween: 16,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
    // Swiper for Client
    const clientSwipper = new Swiper(".client-container", {
      // loop: true,
      slidesPerView: 3,
      spaceBetween: 16,
      breakpoints: {
        768: {
          slidesPerView: 6,
        },
        1200: {
          slidesPerView: 7,
        },
      },
      // Navigation arrows
      navigation: {
        nextEl: ".client-button-next",
        prevEl: ".client-button-prev",
      },
    });
    // Swiper for Client
    const gallerySwipper = new Swiper(".gallery-container", {
      // loop: true,
      slidesPerView: 2,
      spaceBetween: 5,
      breakpoints: {
        768: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
      // Navigation arrows
      navigation: {
        nextEl: ".gallery-button-next",
        prevEl: ".gallery-button-prev",
      },
    });
  }

  selectedGalleryFn(val) {
    this.selectedGallery = val;
  }

  getHomeContent() {
    // this.data.homePage(AppGlobal.apiPaths.homepage).then(
    //   (success: any) => {
    //     this.homeData = success;
    //   },
    //   (error) => { }
    // );
    this.data.homePage("./assets/home.page.json").then(
      (success: any) => {
        this.homePageData = success;
      },
      (error) => {}
    );
  }
}
