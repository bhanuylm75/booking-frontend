const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const places = [
  "Goa",
  "Manali",
  "Leh",
  "Araku Valley",
  "Jammu and Kashmir",
  "Udupi",
  "Coorg",
  "Ooty",
  "Kodaikanal",
  "Alleppey",
  "Kasol",
  "Shimla",
  "Nainital",
  "Mussoorie",
  "Chikmagalur",
  "Shillong"
];

const locationsData = {
  "Goa": { description: "Famous for its pristine beaches, vibrant nightlife, Portuguese heritage, and laid-back atmosphere.", latitude: 15.2993, longitude: 74.1240, state: "Goa" },
  "Manali": { description: "A beautiful hill station surrounded by snow-capped mountains, forests, and adventure activities.", latitude: 32.2396, longitude: 77.1887, state: "Himachal Pradesh" },
  "Leh": { description: "A high-altitude desert offering stunning views of the Himalayas, monasteries, and pristine lakes.", latitude: 34.1526, longitude: 77.5770, state: "Ladakh" },
  "Araku Valley": { description: "A beautiful valley in the Eastern Ghats, known for its coffee plantations, tribal culture, and scenic landscapes.", latitude: 18.3333, longitude: 82.8667, state: "Andhra Pradesh" },
  "Jammu and Kashmir": { description: "Known for its breathtaking landscapes, including valleys, lakes, and snow-capped mountains.", latitude: 33.7782, longitude: 76.5764, state: "Jammu and Kashmir" },
  "Udupi": { description: "Famous for its temples, beaches, and the Udupi cuisine.", latitude: 13.3400, longitude: 74.7880, state: "Karnataka" },
  "Coorg": { description: "A picturesque hill station known for its coffee plantations, misty hills, and waterfalls.", latitude: 12.3375, longitude: 75.8069, state: "Karnataka" },
  "Ooty": { description: "Popular for its rolling hills, tea plantations, and the Nilgiri Mountain Railway.", latitude: 11.4064, longitude: 76.6932, state: "Tamil Nadu" },
  "Kodaikanal": { description: "Known for its scenic beauty, including waterfalls, lakes, and pleasant climate.", latitude: 10.2381, longitude: 77.4890, state: "Tamil Nadu" },
  "Alleppey": { description: "Famous for its backwaters, houseboats, and serene landscapes.", latitude: 9.4981, longitude: 76.3384, state: "Kerala" },
  "Kasol": { description: "A picturesque village in Himachal Pradesh, known for its scenic beauty and trekking opportunities.", latitude: 32.0103, longitude: 77.2458, state: "Himachal Pradesh" },
  "Shimla": { description: "A popular hill station with colonial architecture, pleasant weather, and panoramic views.", latitude: 31.1048, longitude: 77.1734, state: "Himachal Pradesh" },
  "Nainital": { description: "Known for its beautiful lake, pleasant weather, and charming hill station atmosphere.", latitude: 29.3919, longitude: 79.4549, state: "Uttarakhand" },
  "Mussoorie": { description: "A hill station known for its pleasant weather, scenic views, and colonial architecture.", latitude: 30.4598, longitude: 78.3844, state: "Uttarakhand" },
  "Chikmagalur": { description: "Known for its coffee plantations, lush green hills, and pleasant climate.", latitude: 13.3188, longitude: 75.7804, state: "Karnataka" },
  "Shillong": { description: "The Scotland of the East, offering beautiful landscapes, waterfalls, and colonial architecture.", latitude: 25.5788, longitude: 91.8933, state: "Meghalaya" }
};

const destinations = [
  {
    name: "Tirthan Valley",
    latitude: 31.6088,
    longitude: 77.4490,
    description: "Tirthan Valley, located in Himachal Pradesh, is a serene destination untouched by mass tourism. Nestled in the Great Himalayan National Park, it offers pristine rivers, dense forests, and picturesque villages. Ideal for trekking, fishing, and nature walks, Tirthan Valley is a haven for nature lovers. The local culture and simple mountain life add to its charm. The valley is also home to unique flora and fauna, making it perfect for wildlife enthusiasts."
  },
  {
    name: "Ziro Valley",
    latitude: 27.5448,
    longitude: 93.8573,
    description: "Ziro Valley, located in Arunachal Pradesh, is known for its lush green paddy fields and the unique culture of the Apatani tribe. Far from the usual tourist circuits, Ziro offers a peaceful retreat with its cool climate and scenic landscapes. The Ziro Music Festival, an annual event, brings together musicians and travelers for a celebration of music and nature. Ziro’s offbeat charm lies in its untouched natural beauty and tribal heritage."
  },
  {
    name: "Spiti Valley",
    latitude: 32.2462,
    longitude: 78.0170,
    description: "Spiti Valley, a cold desert mountain valley in Himachal Pradesh, is one of India’s most remote and least explored regions. Known for its stark landscapes, ancient monasteries, and rugged terrain, it offers an adventurous escape. Key monasteries like Key and Tabo dot the valley. Spiti is also a great destination for trekking, camping, and spotting unique wildlife. Its offbeat nature makes it perfect for those seeking solitude and raw beauty."
  },
  {
    name: "Mawlynnong",
    latitude: 25.2000,
    longitude: 91.8830,
    description: "Mawlynnong, located in Meghalaya, is known as the cleanest village in Asia. This charming village offers a glimpse into the well-preserved local Khasi culture and showcases their sustainable way of life. With beautiful bamboo huts, lush greenery, and living root bridges nearby, Mawlynnong is a perfect offbeat destination. The village is also close to the stunning Dawki River, known for its crystal-clear waters, adding to the allure of this quiet retreat."
  },
  {
    name: "Majuli",
    latitude: 27.0306,
    longitude: 94.2177,
    description: "Majuli, in Assam, is the world’s largest river island, located on the Brahmaputra River. It is a hidden gem with rich culture, heritage, and natural beauty. The island is home to unique Satras (monastic institutions) and is known for its Vaishnavite traditions. Majuli’s untouched landscapes, traditional boat rides, and peaceful villages make it a great offbeat destination. The island is also a biodiversity hotspot, especially for birdwatchers."
  },
  {
    name: "Gurez Valley",
    latitude: 34.6254,
    longitude: 74.8267,
    description: "Gurez Valley, located in Jammu and Kashmir, is a remote and picturesque valley nestled in the high Himalayas. Surrounded by snow-covered peaks, alpine forests, and the Kishanganga River, Gurez is known for its natural beauty and tranquility. The valley is home to the Dard-Shina tribe, known for their unique culture and language. The rugged terrain and offbeat charm make Gurez an excellent choice for those seeking an unexplored paradise."
  },
  {
    name: "Chopta",
    latitude: 30.3445,
    longitude: 79.0416,
    description: "Chopta, located in Uttarakhand, is a hidden gem often called the 'Mini Switzerland' of India. It is a small region of meadows and evergreen forests, and a base for trekking to Tungnath and Chandrashila peaks. Chopta is an ideal offbeat destination for trekking, bird watching, and camping. With its breathtaking views of the Himalayas, it remains largely untouched by commercial tourism, making it a serene retreat for nature lovers."
  },
  {
    name: "Dzukou Valley",
    latitude: 25.5645,
    longitude: 94.1201,
    description: "Dzukou Valley, located on the border of Nagaland and Manipur, is a stunning valley known for its rolling hills and seasonal flowers. The valley, especially beautiful during the monsoon when it blooms with exotic lilies, is perfect for trekking and camping. Dzukou remains offbeat due to its remote location, offering a peaceful escape from the crowds. The valley is also sacred to the local tribes and holds cultural significance."
  },
  {
    name: "Hampi",
    latitude: 15.3350,
    longitude: 76.4600,
    description: "Hampi, located in Karnataka, is an ancient village that is a UNESCO World Heritage Site. It is famous for its stunning ruins of the Vijayanagara Empire, boulder-strewn landscapes, and unique rock formations. Despite its historical significance, Hampi retains an offbeat charm due to its remote location and laid-back vibe. The village attracts history buffs, backpackers, and spiritual seekers who enjoy the blend of history, nature, and culture."
  },
  {
    name: "Tawang",
    latitude: 27.5845,
    longitude: 91.8749,
    description: "Tawang, located in Arunachal Pradesh, is known for its Buddhist culture, stunning monasteries, and breathtaking landscapes. The Tawang Monastery, one of the largest in India, is a spiritual and cultural hub. Tawang is an offbeat destination due to its remote location in the high Himalayas, attracting only those willing to venture into the less-explored regions. The town offers snow-capped mountains, waterfalls, and serene lakes, making it a hidden gem."
  },
  {
    name: "Munsiyari",
    latitude: 30.0680,
    longitude: 80.2390,
    description: "Munsiyari, located in Uttarakhand, is a secluded hill station with breathtaking views of the Panchachuli Peaks. It is known for its offbeat appeal, with minimal commercialization and a focus on natural beauty. Munsiyari serves as a base for trekking expeditions into the greater Himalayan ranges, making it popular with trekkers and adventure seekers. The town’s remoteness and serene environment make it perfect for travelers seeking solitude."
  }
];


async function getPlacePhotos(placeName) {
  try {
    // Step 1: Search for the place to get Place ID
    const placeSearchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName)}&inputtype=textquery&key=${apiKey}`;
    const placeSearchResponse = await fetch(placeSearchUrl);
    const placeSearchData = await placeSearchResponse.json();

    if (placeSearchData.status !== 'OK' || placeSearchData.candidates.length === 0) {
      console.error(`Place not found for: ${placeName}`);
      return [];
    }

    const placeId = placeSearchData.candidates[0].place_id;

    // Step 2: Get place details to get photo references
    const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${apiKey}`;
    const placeDetailsResponse = await fetch(placeDetailsUrl);
    const placeDetailsData = await placeDetailsResponse.json();

    if (placeDetailsData.status !== 'OK' || !placeDetailsData.result.photos) {
      console.error(`Photos not available for: ${placeName}`);
      return [];
    }

    // Step 3: Construct photo URLs
    const photoUrls = placeDetailsData.result.photos.map(photo => {
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`;
    });
    //console.log(photoUrls)

    return photoUrls;
  } catch (error) {
    console.error(`Error fetching photos for: ${placeName}`, error);
    return [];
  }
}

// Fetch photos for all places and build data objects
export async function fetchAllPlacePhotos() {
  //const placesData = [];

  for (const place of destinations) {
    const photos = await getPlacePhotos(place.name);

    if (photos.length > 0) {
      place.images = photos;  // Modify the current object directly
    }
    
  }

  return destinations

  //console.log(placesData);
  
}

//export default fetchAllPlacePhotos();

