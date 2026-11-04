import type { Metadata } from "next";
import "./globals.css";
import SiteInitializer from "@/components/SiteInitializer";

export const metadata: Metadata = {
  title: "Hire Construction Workers Online | Digital Labour Chowk",
  description:
    "Digital Labour Chowk connects contractors with skilled construction workers across India. Find reliable labour for your construction projects with ease.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        
        {/* Google Fonts: Poppins (Weights: 300, 400, 500, 600, 700, 800, 900) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        />

        {/* Core & Elementor Stylesheets from Original Hosted Site */}
        <link rel="stylesheet" href="/site_files/global.css" />
        <link rel="stylesheet" href="/site_files/fluent-forms-elementor-widget.css" />
        <link rel="stylesheet" href="/site_files/style.min.css" />
        <link rel="stylesheet" href="/site_files/style.css" />
        <link rel="stylesheet" href="/site_files/main.min.css" />
        <link rel="stylesheet" href="/site_files/page-title.min.css" />
        <link rel="stylesheet" href="/site_files/forminator.min.css" />
        <link rel="stylesheet" href="/site_files/elementor-frontend.min.css" />
        <link rel="stylesheet" href="/site_files/frontend.min.css" />
        <link rel="stylesheet" href="/site_files/post-1450.css" />
        <link rel="stylesheet" href="/site_files/e-animation-grow.min.css" />
        <link rel="stylesheet" href="/site_files/fadeIn.min.css" />
        <link rel="stylesheet" href="/site_files/widget-image.min.css" />
        <link rel="stylesheet" href="/site_files/widget-heading.min.css" />
        <link rel="stylesheet" href="/site_files/swiper.min.css" />
        <link rel="stylesheet" href="/site_files/e-swiper.min.css" />
        <link rel="stylesheet" href="/site_files/widget-image-carousel.min.css" />
        <link rel="stylesheet" href="/site_files/fadeInUp.min.css" />
        <link rel="stylesheet" href="/site_files/fadeInLeft.min.css" />
        <link rel="stylesheet" href="/site_files/fadeInRight.min.css" />
        <link rel="stylesheet" href="/site_files/widget-video.min.css" />
        <link rel="stylesheet" href="/site_files/shapes.min.css" />
        <link rel="stylesheet" href="/site_files/widget-divider.min.css" />
        <link rel="stylesheet" href="/site_files/widget-counter.min.css" />
        <link rel="stylesheet" href="/site_files/widget-testimonial-carousel.min.css" />
        <link rel="stylesheet" href="/site_files/widget-carousel-module-base.min.css" />
        <link rel="stylesheet" href="/site_files/post-7492.css" />
        <link rel="stylesheet" href="/site_files/ep-helper.css" />
        <link rel="stylesheet" href="/site_files/roboto.css" />
        <link rel="stylesheet" href="/site_files/robotoslab.css" />
        <link rel="stylesheet" href="/site_files/poppins.css" />
        <link rel="stylesheet" href="/site_files/bdt-uikit.css" />
        <link rel="stylesheet" href="/site_files/elementor-custom.css" />
        <link rel="stylesheet" href="/styles-6EHQIM2K.css" />
        <link rel="stylesheet" href="/styles-D2XNMLLX.css" />

        {/* Subpage Elementor Stylesheets */}
        <link rel="stylesheet" href="/site_files/post-3852.css" />
        <link rel="stylesheet" href="/site_files/post-2036.css" />
        <link rel="stylesheet" href="/site_files/post-2055.css" />
        <link rel="stylesheet" href="/site_files/post-1038.css" />
        <link rel="stylesheet" href="/site_files/post-2232.css" />
        <link rel="stylesheet" href="/site_files/post-4095.css" />

        {/* Subpage Elementor Widgets & Forms */}
        <link rel="stylesheet" href="/site_files/widget-accordion.min.css" />
        <link rel="stylesheet" href="/site_files/widget-nested-accordion.min.css" />
        <link rel="stylesheet" href="/site_files/widget-icon-box.min.css" />
        <link rel="stylesheet" href="/site_files/widget-google_maps.min.css" />
        <link rel="stylesheet" href="/site_files/widget-star-rating.min.css" />
        <link rel="stylesheet" href="/site_files/widget-reviews.min.css" />
        <link rel="stylesheet" href="/site_files/widget-media-carousel.min.css" />
        <link rel="stylesheet" href="/site_files/widget-call-to-action.min.css" />
        <link rel="stylesheet" href="/site_files/widget-spacer.min.css" />
        <link rel="stylesheet" href="/site_files/widget-posts.min.css" />
        <link rel="stylesheet" href="/site_files/fluent-forms-public.css" />
        <link rel="stylesheet" href="/site_files/fluentform-public-default.css" />
        <link rel="stylesheet" href="/site_files/transitions.min.css" />
        <link rel="stylesheet" href="/site_files/projects-components.css" />

        {/* Icons */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

        {/* Runtime Libraries */}
        <script src="/site_files/jquery.min.js" />
        <script src="/site_files/jquery-migrate.min.js" />
        <script src="/site_files/swiper.min.js" />
      </head>
      <body
        suppressHydrationWarning
        className="home wp-singular page-template-default page page-id-7492 wp-embed-responsive wp-theme-blocksy wp-child-theme-blocksy-child elementor-default elementor-kit-1450 elementor-page elementor-page-7492 ct-elementor-default-template e--ua-blink e--ua-chrome e--ua-mac e--ua-webkit"
        data-link="type-2"
        data-prefix="single_page"
        data-header="type-1:sticky"
        data-footer="type-1"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        {children}
        <SiteInitializer />
      </body>
    </html>
  );
}
