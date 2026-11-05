const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'public', 'raw_pages', 'media-coverage.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. PRINT MEDIA SLIDES (5 with links first, then 5 without links)
const printMediaSlides = [
  {
    name: 'Panchjanya',
    image: '/images/for-collaboration/print-media/panchjanya.webp',
    link: 'https://panchjanya.com/2023/05/17/279951/bharat/solution-to-labor-problems/'
  },
  {
    name: 'The Hindu Business Line',
    image: '/images/for-collaboration/print-media/thehindubusinessline.webp',
    link: 'https://www.thehindubusinessline.com/info-tech/fuselage-goudrika-win-hitachi-national-innovation-challenge/article65419369.ece'
  },
  {
    name: 'Live Hindustan',
    image: '/images/for-collaboration/print-media/livehindustan.webp',
    link: 'https://www.livehindustan.com/bihar/story-hindustan-special-digital-labor-chowk-app-is-of-great-use-to-the-workers-online-employment-daily-wages-can-also-be-decided-8850751.html'
  },
  {
    name: 'Dainik Bhaskar',
    image: '/images/for-collaboration/print-media/bhaskar.webp',
    link: 'https://www.bhaskar.com/local/bihar/patna/news/cimps-incubation-startup-digital-labor-chowk-wins-national-innovation-challenge-129913420.html'
  },
  {
    name: 'Local Samosa',
    image: '/images/for-collaboration/print-media/localsamosa.webp',
    link: 'https://www.localsamosa.com/business/digital-labour-chowk-4526918'
  },
  {
    name: 'Dainik Jagran',
    image: '/images/for-collaboration/print-media/dainik-jagran.webp',
    link: null
  },
  {
    name: 'Ganadesh',
    image: '/images/for-collaboration/print-media/ganadesh.webp',
    link: null
  },
  {
    name: 'Morning India',
    image: '/images/for-collaboration/print-media/morning-india.webp',
    link: null
  },
  {
    name: 'Prabhat Khabar',
    image: '/images/for-collaboration/print-media/prabhat-khabar.webp',
    link: null
  },
  {
    name: 'Sahara',
    image: '/images/for-collaboration/print-media/sahara.webp',
    link: null
  }
];

function buildPrintMediaHtml() {
  const slidesHtml = printMediaSlides.map((item, idx) => {
    if (item.link) {
      return `\t\t\t\t\t<div class="swiper-slide" role="group" aria-roledescription="slide" data-swiper-slide-index="${idx}">
\t\t\t\t\t\t<a href="${item.link}" target="_blank" rel="noopener" class="dlc-media-card-link" title="${item.name}">
\t\t\t\t\t\t\t<div class="elementor-carousel-image dlc-media-logo-card" role="img" aria-label="${item.name}" style="background-image: url('${item.image}')"></div>
\t\t\t\t\t\t</a>
\t\t\t\t\t</div>`;
    } else {
      return `\t\t\t\t\t<div class="swiper-slide" role="group" aria-roledescription="slide" data-swiper-slide-index="${idx}">
\t\t\t\t\t\t<div class="dlc-media-card-nolink" title="${item.name}">
\t\t\t\t\t\t\t<div class="elementor-carousel-image dlc-media-logo-card" role="img" aria-label="${item.name}" style="background-image: url('${item.image}')"></div>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>`;
    }
  }).join('\n');

  return `<div class="elementor-element elementor-element-0cc8fe6 elementor-skin-carousel elementor-arrows-yes elementor-pagination-type-bullets elementor-pagination-position-outside elementor-widget elementor-widget-media-carousel e-widget-swiper" data-id="0cc8fe6" data-element_type="widget" data-e-type="widget" data-settings="{&quot;slides_per_view&quot;:&quot;3&quot;,&quot;slides_to_scroll&quot;:&quot;1&quot;,&quot;space_between&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:16,&quot;sizes&quot;:[]},&quot;skin&quot;:&quot;carousel&quot;,&quot;effect&quot;:&quot;slide&quot;,&quot;show_arrows&quot;:&quot;yes&quot;,&quot;pagination&quot;:&quot;bullets&quot;,&quot;speed&quot;:500,&quot;autoplay&quot;:&quot;yes&quot;,&quot;autoplay_speed&quot;:4500,&quot;loop&quot;:&quot;yes&quot;,&quot;pause_on_hover&quot;:&quot;yes&quot;,&quot;pause_on_interaction&quot;:&quot;yes&quot;,&quot;space_between_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:12,&quot;sizes&quot;:[]},&quot;space_between_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:10,&quot;sizes&quot;:[]}}" data-widget_type="media-carousel.default">
\t\t\t\t<div class="elementor-widget-container">
\t\t\t\t\t<div class="elementor-swiper">
\t\t\t\t\t<div class="elementor-main-swiper swiper" role="region" aria-roledescription="carousel" aria-label="Print Media Slides">
\t\t\t\t<div class="swiper-wrapper">
${slidesHtml}
\t\t\t\t</div>
\t\t\t\t<div class="swiper-pagination"></div>
\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t\t</div>`;
}

// 2. TV MEDIA SLIDES (all 11 have links)
const tvMediaSlides = [
  {
    name: 'Republic TV',
    image: '/images/for-collaboration/tv-media/Republic-tv.webp',
    link: 'https://www.youtube.com/watch?v=7DRf-AvizO4'
  },
  {
    name: 'Navbharat Times',
    image: '/images/for-collaboration/tv-media/navbharattimes.webp',
    link: 'https://navbharattimes.indiatimes.com/good-news/success-story-chandrashekhar-mandal-create-digital-labour-chowk-for-daily-wage-workers/articleshow/112689230.cms'
  },
  {
    name: 'Bloomberg',
    image: '/images/for-collaboration/tv-media/bloomberg.webp',
    link: 'https://www.bloomberg.com/news/features/2024-09-05/india-s-unemployment-rate-presents-challenge-to-modi-s-ambitions-for-economy?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb3VyY2UiOiJTdWJzY3JpYmVyR2lmdGVkQXJ0aWNsZSIsImlhdCI6MTcyNTU5Njk1NSwiZXhwIjoxNzI2MjAxNzU1LCJhcnRpY2xlSWQiOiJTSkNZQ0NUMVVNMFcwMCIsImJjb25uZWN0SWQiOiI0QTExMEY4MTRFNDM0OTE3ODA3Mzg2MEU2QjkzODdFRSJ9.JQIR2EzACDpn6Dw_4wGD_2Nbu6ckMlunVNi2F5k7C5M&leadSource=uverify%20wall'
  },
  {
    name: 'ETV Bharat',
    image: '/images/for-collaboration/tv-media/etvbharat.webp',
    link: 'https://www.etvbharat.com/hi/bharat/darbhanga-chandrashekhar-mandal-created-digital-labour-chowk-app-for-daily-wage-labourers-hindi-news-brn25112703589'
  },
  {
    name: 'Channel IM',
    image: '/images/for-collaboration/tv-media/channel-im.webp',
    link: 'https://www.youtube.com/watch?v=5Y55qPsRZz8'
  },
  {
    name: 'YourStory',
    image: '/images/for-collaboration/tv-media/Yourstory.webp',
    link: 'https://www.instagram.com/p/C_fz-DMz5Ei/?utm_source=ig_web_copy_link'
  },
  {
    name: 'Sansad TV',
    image: '/images/for-collaboration/tv-media/sansad-tv.webp',
    link: 'https://www.youtube.com/watch?v=T6e4Sxr5J0A'
  },
  {
    name: 'Amazon miniTV / The Pitchers',
    image: '/images/for-collaboration/tv-media/Amazon-mx-player.webp',
    link: 'https://www.youtube.com/watch?v=V9R_5SAnQK0'
  },
  {
    name: 'The Better India',
    image: '/images/for-collaboration/tv-media/The-better-india.webp',
    link: 'https://www.youtube.com/watch?v=gz3tKhXz3M0'
  },
  {
    name: 'Jagran Business',
    image: '/images/for-collaboration/tv-media/jagran-business.webp',
    link: 'https://www.youtube.com/watch?v=LJ3_Bax9EfU'
  },
  {
    name: 'CNBC TV18',
    image: '/images/for-collaboration/tv-media/cnbc.webp',
    link: 'https://www.youtube.com/watch?v=MgqEr6cDJ3U'
  }
];

function buildTvMediaHtml() {
  const slidesHtml = tvMediaSlides.map((item, idx) => {
    return `\t\t\t\t\t<div class="swiper-slide" role="group" aria-roledescription="slide" data-swiper-slide-index="${idx}">
\t\t\t\t\t\t<a href="${item.link}" target="_blank" rel="noopener" class="dlc-media-card-link" title="${item.name}">
\t\t\t\t\t\t\t<div class="elementor-carousel-image dlc-media-logo-card" role="img" aria-label="${item.name}" style="background-image: url('${item.image}')"></div>
\t\t\t\t\t\t</a>
\t\t\t\t\t</div>`;
  }).join('\n');

  return `<div class="elementor-element elementor-element-8fa8043 elementor-skin-carousel elementor-arrows-yes elementor-pagination-type-bullets elementor-pagination-position-outside elementor-widget elementor-widget-media-carousel e-widget-swiper" data-id="8fa8043" data-element_type="widget" data-e-type="widget" data-settings="{&quot;slides_per_view&quot;:&quot;3&quot;,&quot;slides_to_scroll&quot;:&quot;1&quot;,&quot;space_between&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:16,&quot;sizes&quot;:[]},&quot;skin&quot;:&quot;carousel&quot;,&quot;effect&quot;:&quot;slide&quot;,&quot;show_arrows&quot;:&quot;yes&quot;,&quot;pagination&quot;:&quot;bullets&quot;,&quot;speed&quot;:500,&quot;autoplay&quot;:&quot;yes&quot;,&quot;autoplay_speed&quot;:4500,&quot;loop&quot;:&quot;yes&quot;,&quot;pause_on_hover&quot;:&quot;yes&quot;,&quot;pause_on_interaction&quot;:&quot;yes&quot;,&quot;space_between_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:12,&quot;sizes&quot;:[]},&quot;space_between_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:10,&quot;sizes&quot;:[]}}" data-widget_type="media-carousel.default">
\t\t\t\t<div class="elementor-widget-container">
\t\t\t\t\t<div class="elementor-swiper">
\t\t\t\t\t<div class="elementor-main-swiper swiper" role="region" aria-roledescription="carousel" aria-label="TV Media Slides">
\t\t\t\t<div class="swiper-wrapper">
${slidesHtml}
\t\t\t\t</div>
\t\t\t\t<div class="swiper-pagination"></div>
\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t\t</div>`;
}

// 3. TOP RECOGNITIONS AND ACHIEVEMENTS (8 slides, no links)
const recogSlides = [
  { name: 'BIA, Startup India, 2022', image: '/images/for-collaboration/recognitions/recog-1.webp' },
  { name: 'Champion of Impact Award - MSME', image: '/images/for-collaboration/recognitions/recog-2.webp' },
  { name: 'Best Startup Award, NAREDCO, 2023', image: '/images/for-collaboration/recognitions/recog-3.webp' },
  { name: 'National Innovation Challenge, Hitachi India & KSUM', image: '/images/for-collaboration/recognitions/recog-4.webp' },
  { name: 'Best Startup Initiative in the IT Sector Award', image: '/images/for-collaboration/recognitions/recog-5.webp' },
  { name: 'INK Talks, TiE Global Summit, Bangalore 2024', image: '/images/for-collaboration/recognitions/recog-6.webp' },
  { name: 'Innovation and Startup Fest-2024', image: '/images/for-collaboration/recognitions/recog-7.webp' },
  { name: 'Suniel Shetty, The Pitchers Feature', image: '/images/for-collaboration/recognitions/recog-8.webp' }
];

function buildRecogHtml() {
  const slidesHtml = recogSlides.map((item, idx) => {
    return `\t\t\t\t\t<div class="swiper-slide" role="group" aria-roledescription="slide" data-swiper-slide-index="${idx}">
\t\t\t\t\t\t<div class="dlc-recognition-slide-card" title="${item.name}">
\t\t\t\t\t\t\t<div class="elementor-carousel-image dlc-recognition-image" role="img" aria-label="${item.name}" style="background-image: url('${item.image}')"></div>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>`;
  }).join('\n');

  return `<div class="elementor-element elementor-element-3e8d1fd elementor-skin-carousel elementor-arrows-yes elementor-pagination-type-bullets elementor-widget elementor-widget-media-carousel e-widget-swiper" data-id="3e8d1fd" data-element_type="widget" data-e-type="widget" data-settings="{&quot;slides_per_view&quot;:&quot;2&quot;,&quot;slides_to_scroll&quot;:&quot;1&quot;,&quot;space_between&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:24,&quot;sizes&quot;:[]},&quot;skin&quot;:&quot;carousel&quot;,&quot;effect&quot;:&quot;slide&quot;,&quot;show_arrows&quot;:&quot;yes&quot;,&quot;pagination&quot;:&quot;bullets&quot;,&quot;speed&quot;:600,&quot;autoplay&quot;:&quot;yes&quot;,&quot;autoplay_speed&quot;:5000,&quot;loop&quot;:&quot;yes&quot;,&quot;pause_on_hover&quot;:&quot;yes&quot;,&quot;space_between_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:16,&quot;sizes&quot;:[]},&quot;space_between_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:12,&quot;sizes&quot;:[]}}" data-widget_type="media-carousel.default">
\t\t\t\t<div class="elementor-widget-container">
\t\t\t\t\t<div class="elementor-swiper">
\t\t\t\t\t<div class="elementor-main-swiper swiper" role="region" aria-roledescription="carousel" aria-label="Top Recognitions Slides">
\t\t\t\t<div class="swiper-wrapper">
${slidesHtml}
\t\t\t\t</div>
\t\t\t\t<div class="elementor-swiper-button elementor-swiper-button-prev" role="button" tabindex="0" aria-label="Previous slide">
\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-eicon-chevron-left" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M646 125C629 125 613 133 604 142L308 442C296 454 292 471 292 487 292 504 296 521 308 533L604 854C617 867 629 875 646 875 663 875 679 871 692 858 704 846 713 829 713 812 713 796 708 779 692 767L438 487 692 225C700 217 708 204 708 187 708 171 704 154 692 142 675 129 663 125 646 125Z"></path></svg>
\t\t\t\t</div>
\t\t\t\t<div class="elementor-swiper-button elementor-swiper-button-next" role="button" tabindex="0" aria-label="Next slide">
\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-eicon-chevron-right" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M696 533C708 521 713 504 713 487 713 471 708 454 696 446L400 146C388 133 375 125 354 125 338 125 325 129 313 142 300 154 292 171 292 187 292 204 296 221 308 233L563 492 304 771C292 783 288 800 288 817 288 833 296 850 308 863 321 871 338 875 354 875 371 875 388 867 400 854L696 533Z"></path></svg>
\t\t\t\t</div>
\t\t\t\t<div class="swiper-pagination"></div>
\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t\t</div>`;
}

// 4. COLLABORATION SLIDES (15 slides, no links)
const collabCount = 15;
function buildCollabHtml() {
  let slides = [];
  for (let i = 1; i <= collabCount; i++) {
    slides.push(`\t\t\t\t\t<div class="swiper-slide" role="group" aria-roledescription="slide" data-swiper-slide-index="${i - 1}">
\t\t\t\t\t\t<div class="dlc-collab-slide-card" title="Partner & Collaborator">
\t\t\t\t\t\t\t<div class="elementor-carousel-image dlc-collab-image" role="img" aria-label="Partner ${i}" style="background-image: url('/images/for-collaboration/collaborations/collab-${i}.webp')"></div>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>`);
  }
  const slidesHtml = slides.join('\n');

  return `<div class="elementor-element elementor-element-d426b04 elementor-skin-carousel elementor-arrows-yes elementor-widget elementor-widget-media-carousel e-widget-swiper" data-id="d426b04" data-element_type="widget" data-e-type="widget" data-settings="{&quot;slides_per_view&quot;:&quot;5&quot;,&quot;slides_to_scroll&quot;:&quot;1&quot;,&quot;space_between&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:16,&quot;sizes&quot;:[]},&quot;skin&quot;:&quot;carousel&quot;,&quot;effect&quot;:&quot;slide&quot;,&quot;show_arrows&quot;:&quot;yes&quot;,&quot;speed&quot;:500,&quot;autoplay&quot;:&quot;yes&quot;,&quot;autoplay_speed&quot;:3500,&quot;loop&quot;:&quot;yes&quot;,&quot;pause_on_hover&quot;:&quot;yes&quot;,&quot;space_between_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:12,&quot;sizes&quot;:[]},&quot;space_between_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:10,&quot;sizes&quot;:[]}}" data-widget_type="media-carousel.default">
\t\t\t\t<div class="elementor-widget-container">
\t\t\t\t\t<div class="elementor-swiper">
\t\t\t\t\t<div class="elementor-main-swiper swiper" role="region" aria-roledescription="carousel" aria-label="Collaboration Slides">
\t\t\t\t<div class="swiper-wrapper">
${slidesHtml}
\t\t\t\t</div>
\t\t\t\t<div class="elementor-swiper-button elementor-swiper-button-prev" role="button" tabindex="0" aria-label="Previous slide">
\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-eicon-chevron-left" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M646 125C629 125 613 133 604 142L308 442C296 454 292 471 292 487 292 504 296 521 308 533L604 854C617 867 629 875 646 875 663 875 679 871 692 858 704 846 713 829 713 812 713 796 708 779 692 767L438 487 692 225C700 217 708 204 708 187 708 171 704 154 692 142 675 129 663 125 646 125Z"></path></svg>
\t\t\t\t</div>
\t\t\t\t<div class="elementor-swiper-button elementor-swiper-button-next" role="button" tabindex="0" aria-label="Next slide">
\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-eicon-chevron-right" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M696 533C708 521 713 504 713 487 713 471 708 454 696 446L400 146C388 133 375 125 354 125 338 125 325 129 313 142 300 154 292 171 292 187 292 204 296 221 308 233L563 492 304 771C292 783 288 800 288 817 288 833 296 850 308 863 321 871 338 875 354 875 371 875 388 867 400 854L696 533Z"></path></svg>
\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t\t</div>`;
}

// Function to replace each widget accurately
function replaceWidget(sourceHtml, widgetId, newWidgetHtml) {
  const marker = '<div class="elementor-element ' + widgetId;
  const startIdx = sourceHtml.indexOf(marker);
  if (startIdx === -1) {
    throw new Error('Widget not found: ' + widgetId);
  }

  // Find closing </div> of this widget: it has 4 levels of divs:
  // <div class="elementor-element...
  //   <div class="elementor-widget-container"
  //     <div class="elementor-swiper"
  //       <div class="elementor-main-swiper...
  // Each open tag adds 1, each close tag subtracts 1
  let depth = 0;
  let endIdx = -1;
  const len = sourceHtml.length;
  for (let i = startIdx; i < len; i++) {
    if (sourceHtml.startsWith('<div', i)) {
      depth++;
      i += 3;
    } else if (sourceHtml.startsWith('</div', i)) {
      depth--;
      i += 5;
      if (depth === 0) {
        // Look for the closing '>'
        const closeTagEnd = sourceHtml.indexOf('>', i - 6) + 1;
        endIdx = closeTagEnd;
        break;
      }
    }
  }

  if (endIdx === -1) {
    throw new Error('Failed to find closing tag for: ' + widgetId);
  }

  return sourceHtml.slice(0, startIdx) + newWidgetHtml + sourceHtml.slice(endIdx);
}

// Replace in order from bottom to top so indices don't shift
console.log('Replacing Collaboration (d426b04)...');
html = replaceWidget(html, 'elementor-element-d426b04', buildCollabHtml());

console.log('Replacing Top Recognitions (3e8d1fd)...');
html = replaceWidget(html, 'elementor-element-3e8d1fd', buildRecogHtml());

console.log('Replacing TV Media (8fa8043)...');
html = replaceWidget(html, 'elementor-element-8fa8043', buildTvMediaHtml());

console.log('Replacing Print Media (0cc8fe6)...');
html = replaceWidget(html, 'elementor-element-0cc8fe6', buildPrintMediaHtml());

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully updated media-coverage.html!');
