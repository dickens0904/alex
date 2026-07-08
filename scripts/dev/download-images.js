const fs = require('fs');
const path = require('path');
const https = require('https');

const outputDir = './src/assets/images/lessons';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const imagePrompts = [
  'A polite person stopping another person in a public place, pointing at a handbag',
  'Colorful classroom with various items on desks: pens, pencils, books',
  'A gentleman at a cloakroom counter picking up his coat and umbrella',
  'A school classroom with children sitting at desks, teacher pointing at a board',
  'A teacher introducing a new student to the class, world map on wall',
  'A car showroom with various luxury cars on display',
  'People of different nationalities meeting and greeting each other',
  'Various professionals in their work settings',
  'Two friends meeting and greeting each other',
  'People with different appearances: fat thin tall short dirty clean',
  'A teacher asking a student whose shirt it is',
  'A family scene showing father mother brother sister',
  'A young girl showing her new green dress and lovely hat',
  'Various colorful items: red carpet grey dog yellow hat',
  'At customs checkpoint, customs officer checking passports',
  'Russian and Dutch tourists at airport with their cases',
  'Mr. Jackson introducing employees in an office',
  'Group of people with different jobs',
  'Children saying they are tired and thirsty',
  'A man asking for a book from Jane',
  'A woman showing her new watch',
  'A customer asking about the price of a dress',
  'A mother preparing lunch for her children',
  'A boy looking for his school bag',
  'A girl reading a book on the sofa',
  'A family having dinner together',
  'A student doing homework at desk',
  'A man repairing a car in the garage',
  'A woman shopping in a supermarket',
  'A child playing with toys in the room',
  'A teacher writing on the blackboard',
  'A doctor examining a patient',
  'A chef cooking in the kitchen',
  'A policeman directing traffic',
  'A pilot in the airplane cockpit',
  'A fireman putting out a fire',
  'A farmer working in the field',
  'A fisherman fishing by the lake',
  'A musician playing the piano',
  'An artist painting a picture',
  'A photographer taking photos',
  'A waiter serving food in a restaurant',
  'A salesperson helping a customer',
  'A receptionist answering the phone',
  'A secretary typing on the computer',
  'A manager talking to employees',
  'A scientist working in the lab',
  'An engineer drawing plans',
  'A construction worker building a house',
  'A delivery person delivering packages',
  'A postman delivering mail',
  'A baker baking bread',
  'A butcher cutting meat',
  'A greengrocer arranging vegetables',
  'A fishmonger selling fish',
  'A bookseller arranging books',
  'A tailor measuring a customer',
  'A hairdresser cutting hair',
  'A dentist examining teeth',
  'A nurse taking temperature',
  'A vet examining a dog',
  'A zookeeper feeding animals',
  'A gardener watering plants',
  'A cleaner cleaning the room',
  'A driver driving a bus',
  'A conductor checking tickets',
  'A train station with people waiting',
  'An airport with airplanes',
  'A ship sailing on the sea',
  'A mountain landscape with hiking trails',
  'A beach scene with people swimming',
  'A forest with tall trees',
  'A river flowing through the valley',
  'A city skyline at night',
  'A village with small houses',
  'A farm with cows and sheep',
  'A factory with machines',
  'A shopping mall with stores',
  'A library with many books',
  'A museum with exhibits',
  'A theater with stage',
  'A cinema with movie screen',
  'A sports stadium with players',
  'A swimming pool with swimmers',
  'A playground with children playing',
  'A park with flowers and benches',
  'A garden with beautiful roses',
  'A kitchen with cooking utensils',
  'A bedroom with bed and wardrobe',
  'A bathroom with shower and sink',
  'A living room with sofa and TV',
  'A dining room with table and chairs',
  'A study room with desk and bookshelf',
  'A garage with cars',
  'A basement with storage boxes',
  'An attic with old items',
  'A balcony with plants',
  'A terrace with outdoor furniture',
  'A garden shed with tools',
  'A greenhouse with plants',
  'A pet house with dog and cat',
  'A birdcage with parrot',
  'A fish tank with colorful fish',
  'A turtle in the pond',
  'A rabbit in the garden',
  'A hamster in its cage',
  'A guinea pig eating vegetables',
  'A goldfish swimming',
  'A canary singing',
  'A cat sleeping on the sofa',
  'A dog playing with a ball',
  'A horse running in the field',
  'A cow eating grass',
  'A sheep grazing',
  'A pig in the sty',
  'A chicken in the coop',
  'A duck swimming',
  'A goose walking',
  'A turkey in the farm',
  'A deer in the forest',
  'A squirrel climbing tree',
  'A rabbit hopping',
  'A fox in the woods',
  'A bear in the forest',
  'A wolf howling',
  'A lion in the zoo',
  'A tiger in the jungle',
  'A elephant in safari',
  'A giraffe eating leaves',
  'A zebra with stripes',
  'A monkey swinging',
  'A gorilla in the forest',
  'A hippopotamus in the river',
  'A crocodile in the water',
  'A snake crawling',
  'A turtle swimming',
  'A frog jumping',
  'A bird flying',
  'An eagle soaring',
  'A sparrow chirping',
  'A swallow flying',
  'A pigeon on the street',
  'A butterfly flying',
  'A bee on flower',
  'A ladybug on leaf',
  'An ant carrying food',
  'A spider making web',
  'A dragonfly hovering',
  'A grasshopper jumping',
  'A caterpillar crawling',
  'A snail moving slowly',
  'A worm in the soil',
  'A fish swimming in ocean',
  'A shark in deep sea',
  'A dolphin jumping',
  'A whale in the ocean',
  'A seagull flying over sea',
  'A crab on the beach',
  'A starfish on sand',
  'A jellyfish floating',
  'A octopus swimming',
  'A lobster in the sea',
  'A shrimp swimming',
  'A clam on the ocean floor',
];

const baseUrl = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image';
let downloaded = 0;
const total = imagePrompts.length;

function downloadImage(prompt, lessonId) {
  return new Promise((resolve) => {
    const url = `${baseUrl}?prompt=${encodeURIComponent(prompt)}&image_size=landscape_4_3`;
    const filename = `lesson-${lessonId}.jpg`;
    const file = fs.createWriteStream(path.join(outputDir, filename));
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          downloaded++;
          console.log(`[${downloaded}/${total}] 下载完成: ${filename}`);
          resolve();
        });
      } else {
        file.close();
        console.log(`[${downloaded}/${total}] 下载失败: ${filename} - 状态码: ${response.statusCode}`);
        resolve();
      }
    }).on('error', (err) => {
      file.close();
      console.log(`[${downloaded}/${total}] 下载失败: ${filename} - ${err.message}`);
      resolve();
    });
  });
}

async function downloadAllImages() {
  console.log(`开始下载 ${total} 张图片...\n`);
  
  for (let i = 0; i < imagePrompts.length; i++) {
    await downloadImage(imagePrompts[i], i + 1);
  }
  
  console.log(`\n下载完成！共下载 ${downloaded} 张图片`);
}

downloadAllImages();