-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Dec 28. 20:52
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `openforum`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `comments`
--

CREATE TABLE `comments` (
  `id` int(10) NOT NULL,
  `post_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `text` text NOT NULL,
  `date` date NOT NULL,
  `valid` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `user_id`, `text`, `date`, `valid`) VALUES
(1, 1, 7, 'Totally agree, AI development is accelerating faster than ever.', '2023-02-18', 1),
(2, 1, 13, 'I think we’ll see major improvements in generative video soon.', '2023-02-20', 1),
(3, 2, 4, 'VR is cool but still too pricey for mainstream users.', '2023-03-05', 1),
(4, 3, 1, 'Haha yes! I still mod Skyrim every few months.', '2023-05-12', 1),
(5, 3, 20, 'Try Enderal if you haven’t yet — amazing mod story.', '2023-05-14', 1),
(6, 4, 10, 'Hades II is definitely a strong contender this year.', '2023-05-21', 1),
(7, 5, 15, 'Oppenheimer was pure cinematic genius.', '2023-07-26', 1),
(8, 5, 28, 'Nolan never disappoints with sound design either.', '2023-07-28', 1),
(9, 6, 5, 'Can’t wait for Dune: Part Three already!', '2023-08-10', 1),
(10, 7, 6, 'That album was on repeat for weeks for me too.', '2023-08-27', 1),
(11, 8, 9, 'Vaporwave will never die.', '2023-09-03', 1),
(12, 9, 16, 'Pizza, every single time.', '2023-09-18', 1),
(13, 10, 8, 'I love ramen too! What’s the restaurant called?', '2023-09-30', 1),
(14, 11, 3, 'Japan is top of my list — the culture and food!', '2023-10-07', 1),
(15, 12, 11, 'Iceland is on my bucket list for sure.', '2023-10-11', 1),
(16, 13, 12, 'Python all the way, can’t beat the versatility.', '2023-11-09', 1),
(17, 13, 19, 'Go is great for backend systems though.', '2023-11-13', 1),
(18, 14, 33, 'Rust ownership model is tough, but worth it.', '2023-11-23', 1),
(19, 15, 17, 'Nice choice! The 50mm lens is perfect for portraits.', '2024-01-10', 1),
(20, 16, 36, 'Lightroom is my go-to editing software.', '2024-01-14', 1),
(21, 17, 14, 'Currently reading “Project Hail Mary” – absolutely loved it.', '2024-02-13', 1),
(22, 18, 25, 'That one is on my reading list too.', '2024-02-20', 1),
(23, 19, 22, 'Push-pull workouts are efficient for sure.', '2024-03-10', 1),
(24, 20, 38, 'I tried fasting too, helped a lot with energy levels.', '2024-03-17', 1),
(25, 21, 3, 'Webb’s images are mind-blowing, truly cosmic art.', '2024-03-31', 1),
(26, 22, 24, 'Time dilation is one of the most fascinating concepts in physics.', '2024-04-12', 1),
(27, 23, 2, 'Tesla for me — innovation and design.', '2024-04-18', 1),
(28, 24, 21, 'EVs are getting better but range anxiety is real.', '2024-04-26', 1),
(29, 25, 9, 'I learned more from YouTube than in school, lol.', '2024-05-05', 1),
(30, 26, 8, 'Khan Academy is still the best free platform.', '2024-05-14', 1),
(31, 27, 13, 'Tesla was indeed way ahead of his time.', '2024-05-27', 1),
(32, 28, 7, 'Agreed, Tesla deserves way more credit.', '2024-06-06', 1),
(33, 29, 1, 'I only read digital newspapers now.', '2024-06-26', 1),
(34, 31, 6, 'I prefer Figma for prototypes.', '2024-07-05', 1),
(35, 32, 18, 'Adobe XD feels outdated these days.', '2024-07-16', 1),
(36, 35, 23, 'Watercolor is beautiful when done digitally.', '2024-08-27', 1),
(37, 37, 25, 'I use Notion to track expenses, works great.', '2024-09-11', 1),
(38, 41, 30, 'VS Code + Copilot = dream setup.', '2024-10-13', 1),
(39, 45, 36, 'Meme quality dropping across the internet sadly.', '2024-11-15', 1),
(40, 48, 39, 'Camping solo is peaceful, but always stay alert.', '2024-12-05', 1),
(41, 53, 9, 'Seeking help is a sign of strength, not weakness.', '2025-01-12', 1),
(42, 59, 16, 'This year’s Champions League is unpredictable.', '2025-03-05', 1),
(43, 60, 19, 'We might already be living with AI smarter than we think.', '2025-03-27', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `communities`
--

CREATE TABLE `communities` (
  `id` int(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `valid` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `communities`
--

INSERT INTO `communities` (`id`, `name`, `description`, `date`, `valid`) VALUES
(1, 'tech', 'Minden, ami technológia – hírek, trendek, eszközök és fejlesztések.', '2023-02-11', 1),
(2, 'gaming', 'Játékosok közössége: PC, konzol, mobil és indie game-ek.', '2023-05-04', 1),
(3, 'movies', 'Filmek, sorozatok, kritikák és ajánlók minden műfajban.', '2023-07-22', 1),
(4, 'music', 'Zeneimádók fóruma: műfajok, előadók, új megjelenések.', '2023-08-19', 1),
(5, 'food', 'Receptek, gasztrotippek, éttermek és főzési tanácsok.', '2023-09-15', 1),
(6, 'travel', 'Utazási élmények, tippek, látványosságok a világ minden tájáról.', '2023-11-02', 1),
(7, 'programming', 'Fejlesztők fóruma – kód, technológiák és hibakeresés.', '2024-01-05', 1),
(8, 'photography', 'Fotósok közössége, technikák, felszerelések és inspiráció.', '2024-02-13', 1),
(9, 'books', 'Könyvek, írók, olvasási tippek és irodalmi beszélgetések.', '2024-03-22', 0),
(10, 'fitness', 'Egészség, sport, edzéstervek és motivációs történetek.', '2024-04-17', 1),
(11, 'science', 'Tudományos felfedezések, kutatások és elméletek vitafóruma.', '2024-05-09', 1),
(12, 'cars', 'Autók, motorok, tuning és közlekedési témák.', '2024-06-11', 1),
(13, 'education', 'Tanulás, oktatás, vizsgák és diákélet minden szinten.', '2024-07-03', 1),
(14, 'history', 'Történelem, régészet, érdekes múltbeli események.', '2024-08-27', 1),
(15, 'news', 'Aktuális események, politika és világhelyzet megvitatása.', '2024-09-14', 1),
(16, 'design', 'Grafika, UI/UX, webdesign és kreatív alkotások.', '2024-10-08', 1),
(17, 'fashion', 'Divat, stílus, trendek és öltözködési tanácsok.', '2024-11-02', 1),
(18, 'pets', 'Háziállatok, gondozás, tippek és kedvenc sztorik.', '2024-12-12', 1),
(19, 'relationships', 'Kapcsolatok, párkapcsolati tanácsok és emberi történetek.', '2025-01-06', 1),
(20, 'finance', 'Pénzügy, befektetés, megtakarítás és gazdasági hírek.', '2025-01-24', 0),
(21, 'startup', 'Vállalkozók és startup alapítók fóruma.', '2025-02-17', 1),
(22, 'art', 'Festészet, szobrászat, digitális művészet és alkotói folyamatok.', '2025-03-05', 1),
(23, 'coding_help', 'Programozási segítségkérés és tudásmegosztás.', '2025-03-28', 1),
(24, 'memes', 'Humor, mémek és közösségi szórakozás.', '2025-04-15', 'n'),
(25, 'nature', 'Természet, környezetvédelem és fenntarthatóság.', '2025-05-09', 1),
(26, 'parenting', 'Gyermeknevelés, családi élet és szülői tapasztalatok.', '2025-06-01', 1),
(27, 'psychology', 'Lélektan, önismeret és mentális egészség.', '2025-07-18', 1),
(28, 'languages', 'Nyelvtanulás, fordítás és többnyelvű beszélgetések.', '2025-08-23', 1),
(29, 'ai_and_future', 'Mesterséges intelligencia, automatizáció és jövőkutatás.', '2025-09-20', 1),
(30, 'sports', 'Foci, kosár, e-sport és minden, ami mozgás.', '2025-10-10', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `community_users`
--

CREATE TABLE `community_users` (
  `community_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `role` char(1) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `community_users`
--

INSERT INTO `community_users` (`community_id`, `user_id`, `role`, `date`) VALUES
(1, 4, 'O', '2023-02-11'),
(1, 7, 'U', '2023-03-02'),
(1, 13, 'U', '2023-03-15'),
(2, 10, 'O', '2023-05-04'),
(2, 1, 'M', '2023-05-11'),
(2, 20, 'U', '2023-05-18'),
(3, 5, 'O', '2023-07-20'),
(3, 15, 'M', '2023-07-29'),
(3, 28, 'U', '2023-08-03'),
(4, 6, 'O', '2023-08-21'),
(4, 9, 'U', '2023-08-30'),
(4, 35, 'U', '2023-09-02'),
(5, 8, 'O', '2023-09-15'),
(5, 16, 'M', '2023-09-22'),
(5, 2, 'U', '2023-09-27'),
(6, 11, 'O', '2023-10-01'),
(6, 18, 'U', '2023-10-08'),
(6, 3, 'U', '2023-10-12'),
(7, 12, 'O', '2023-11-03'),
(7, 19, 'U', '2023-11-10'),
(7, 33, 'U', '2023-11-18'),
(8, 17, 'O', '2024-01-05'),
(8, 36, 'U', '2024-01-09'),
(8, 40, 'U', '2024-01-15'),
(9, 14, 'O', '2024-02-10'),
(9, 25, 'M', '2024-02-17'),
(9, 29, 'U', '2024-02-22'),
(10, 22, 'O', '2024-03-05'),
(10, 32, 'U', '2024-03-12'),
(10, 38, 'U', '2024-03-18'),
(11, 3, 'O', '2024-03-28'),
(11, 4, 'M', '2024-04-02'),
(11, 24, 'U', '2024-04-09'),
(12, 2, 'O', '2024-04-15'),
(12, 21, 'U', '2024-04-21'),
(12, 30, 'U', '2024-04-27'),
(13, 9, 'O', '2024-05-02'),
(13, 27, 'U', '2024-05-09'),
(13, 8, 'U', '2024-05-16'),
(14, 13, 'O', '2024-05-24'),
(14, 23, 'M', '2024-05-31'),
(14, 7, 'U', '2024-06-03'),
(15, 15, 'O', '2024-06-10'),
(15, 16, 'U', '2024-06-17'),
(15, 1, 'U', '2024-06-23'),
(16, 18, 'O', '2024-07-01'),
(16, 19, 'U', '2024-07-07'),
(16, 6, 'U', '2024-07-13'),
(17, 20, 'O', '2024-07-22'),
(17, 11, 'M', '2024-07-27'),
(17, 10, 'U', '2024-08-03'),
(18, 21, 'O', '2024-08-15'),
(18, 22, 'U', '2024-08-21'),
(18, 23, 'U', '2024-08-26'),
(19, 24, 'O', '2024-09-01'),
(19, 25, 'U', '2024-09-07'),
(19, 26, 'U', '2024-09-12'),
(20, 27, 'O', '2024-09-18'),
(20, 28, 'U', '2024-09-24'),
(20, 29, 'U', '2024-09-29'),
(21, 30, 'O', '2024-10-03'),
(21, 31, 'U', '2024-10-09'),
(21, 32, 'U', '2024-10-14'),
(22, 33, 'O', '2024-10-20'),
(22, 34, 'M', '2024-10-25'),
(22, 35, 'U', '2024-10-30'),
(23, 36, 'O', '2024-11-05'),
(23, 37, 'U', '2024-11-11'),
(23, 38, 'U', '2024-11-16'),
(24, 39, 'O', '2024-11-21'),
(24, 40, 'U', '2024-11-25'),
(24, 5, 'U', '2024-12-01'),
(25, 1, 'O', '2024-12-08'),
(25, 2, 'U', '2024-12-14'),
(25, 3, 'U', '2024-12-18'),
(26, 4, 'O', '2025-01-02'),
(26, 8, 'U', '2025-01-08'),
(26, 9, 'U', '2025-01-12'),
(27, 10, 'O', '2025-01-19'),
(27, 11, 'U', '2025-01-25'),
(27, 12, 'U', '2025-01-31'),
(28, 13, 'O', '2025-02-07'),
(28, 14, 'U', '2025-02-13'),
(28, 15, 'U', '2025-02-18'),
(29, 16, 'O', '2025-03-01'),
(29, 17, 'U', '2025-03-08'),
(29, 18, 'U', '2025-03-15'),
(30, 19, 'O', '2025-03-22'),
(30, 20, 'M', '2025-03-28'),
(30, 21, 'U', '2025-04-02');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `posts`
--

CREATE TABLE `posts` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `community_id` int(10) NOT NULL,
  `text` text NOT NULL,
  `date` date NOT NULL,
  `title` varchar(100) NOT NULL,
  `valid` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `community_id`, `text`, `date`, `title`, `valid`) VALUES
(1, 4, 1, 'AI has been evolving at an insane pace lately. From generative art to code-writing assistants, it feels like something big is just around the corner. What do you think will be the next major trend in AI tech this year, and why?', '2023-02-15', 'The Next Big Trend in AI', 0),
(2, 7, 1, 'I just tried the new VR headset from Meta and I’ve got to say, the performance blew me away. The visuals are crisp, the latency is minimal, and the hand tracking feels smoother than ever. Anyone else tested it yet?', '2023-03-01', 'First Impressions: Meta’s New VR Headset', 1),
(3, 10, 2, 'I’ve been replaying Skyrim again in 2025, and it’s still a masterpiece. The modding community keeps breathing new life into it every year. Anyone else still exploring Tamriel with new mods?', '2023-05-10', 'Still Playing Skyrim in 2025', 1),
(4, 20, 2, 'There are so many great indie games out right now, but Hades II really stood out for me. The art, gameplay, and soundtrack are all incredible. What’s the best indie game you’ve played recently?', '2023-05-19', 'Best Indie Games of the Year', 1),
(5, 5, 3, 'I finally watched Oppenheimer and I’m still thinking about it. Nolan perfectly captured the intensity and complexity of that era. The sound design alone deserves an award.', '2023-07-24', 'Oppenheimer: A Masterclass in Tension', 1),
(6, 28, 3, 'Just watched Dune: Part Two and I’m speechless. The visuals, the scale, and the storytelling are next-level. Villeneuve truly understands how to make sci-fi feel epic and emotional.', '2023-08-05', 'Dune: Part Two — A Cinematic Masterpiece', 1),
(7, 6, 4, 'There were so many amazing albums released in 2024. Personally, the Arctic Monkeys’ latest one has been on repeat for me. What about you guys — what’s your favorite album of the year?', '2023-08-25', 'Favorite Albums of 2024', 1),
(8, 35, 4, 'Anyone here into vaporwave? I’ve been digging into retro synth playlists lately, and it’s such a relaxing vibe. Let’s share some playlists and maybe discover hidden gems together.', '2023-09-01', 'Vaporwave Playlist Exchange', 1),
(9, 8, 5, 'On a rainy day, nothing beats comfort food. For me, it’s a big bowl of ramen or grilled cheese with tomato soup. What’s your ultimate comfort food when it’s gloomy outside?', '2023-09-17', 'Rainy Day Comfort Foods', 0),
(10, 2, 5, 'I stumbled upon a new ramen place downtown and it completely blew my mind. The broth was rich, the noodles perfectly chewy, and the vibe super cozy. Highly recommend checking it out.', '2023-09-29', 'Discovered a New Ramen Spot', 1),
(11, 11, 6, 'If you could travel anywhere in the world, where would you go? I’ve been daydreaming about places like Japan or New Zealand lately — both seem magical for different reasons.', '2023-10-04', 'Dream Travel Destinations', 1),
(12, 3, 6, 'I recently visited Iceland and it was unreal — waterfalls, glaciers, black sand beaches, and the northern lights. It’s one of those places that looks even better in person.', '2023-10-10', 'My Trip to Iceland', 1),
(13, 12, 7, 'Programming languages each have their charm, but everyone has a favorite. I’m curious — what’s your go-to language, and what makes it special to you?', '2023-11-06', 'Your Favorite Programming Language', 1),
(14, 33, 7, 'Rust is a powerhouse when it comes to performance and safety, but I’ll admit, the learning curve can be steep. Anyone else here struggled but eventually grew to love it?', '2023-11-20', 'Thoughts on Learning Rust', 1),
(15, 17, 8, 'Just picked up a Canon 50mm f/1.8 lens and the photos look stunning. The depth of field and sharpness are unreal for the price. Anyone else use this lens?', '2024-01-07', 'Testing My New 50mm Lens', 1),
(16, 36, 8, 'Photo editing tools have come a long way. Between Lightroom, Capture One, and Affinity, it’s hard to pick a favorite. What’s the best photo editing software for pros right now?', '2024-01-13', 'Best Photo Editing Software Today', 1),
(17, 14, 9, 'Books have always been my escape. I just started a new one and I’m curious — what are you currently reading, and would you recommend it?', '2024-02-11', 'What Are You Reading Right Now?', 1),
(18, 25, 9, 'I just finished “The Midnight Library” and it completely changed how I view regrets and choices. Such a moving story. Anyone else loved it as much as I did?', '2024-02-19', 'Finished Reading “The Midnight Library”', 1),
(19, 22, 10, 'Trying to stay consistent with workouts is tough, but finding the right routine makes all the difference. What’s your go-to workout, and how do you stay motivated?', '2024-03-07', 'Your Favorite Workout Routine', 1),
(20, 38, 10, 'I’ve been experimenting with intermittent fasting for a few months. The energy boost and focus are noticeable. Anyone else tried it — what was your experience like?', '2024-03-15', 'Experiences with Intermittent Fasting', 1),
(21, 3, 11, 'The James Webb Space Telescope just keeps delivering jaw-dropping images. The detail and clarity are unreal. Space truly never stops amazing me.', '2024-03-29', 'Stunning James Webb Images', 1),
(22, 24, 11, 'Time dilation around black holes is one of those concepts that blows my mind every time. The idea of time moving differently depending on gravity is wild.', '2024-04-10', 'Let’s Talk About Black Holes', 1),
(23, 2, 12, 'Car enthusiasts, I’m curious — what’s your favorite car brand and what makes it stand out to you? Design, performance, or reliability?', '2024-04-16', 'Favorite Car Brands', 0),
(24, 21, 12, 'Electric cars are evolving fast, and I truly believe they’re the future of transportation. The tech keeps getting better and charging is becoming easier.', '2024-04-25', 'Why Electric Cars Are the Future', 1),
(25, 9, 13, 'It’s amazing how much online learning has improved since 2020. Courses are more interactive, engaging, and affordable than ever.', '2024-05-03', 'The Evolution of Online Learning', 1),
(26, 27, 13, 'YouTube has become one of my main learning platforms. Channels like Kurzgesagt and CrashCourse are gold. What’s your favorite YouTube channel for learning something new?', '2024-05-12', 'Best YouTube Channels for Learning', 1),
(27, 13, 14, 'There are countless historical figures who don’t get the credit they deserve. Who’s someone from history you think is underrated and why?', '2024-05-26', 'Most Underrated Historical Figures', 1),
(28, 7, 14, 'Nikola Tesla’s work still feels ahead of its time. He paved the way for so much modern technology but rarely gets the recognition he deserves.', '2024-06-04', 'Why Nikola Tesla Deserves More Credit', 1),
(29, 15, 15, 'It’s hard to stay informed without drowning in bad news. How do you balance staying updated with avoiding doomscrolling?', '2024-06-12', 'Staying Informed Without Doomscrolling', 1),
(30, 1, 15, 'Do you still read physical newspapers or have you completely switched to digital sources? I’m curious how people consume news today.', '2024-06-25', 'Print vs Digital News', 1),
(31, 18, 16, 'Designers, show off what you’ve been working on lately! I’d love to see everyone’s latest design projects, big or small.', '2024-07-03', 'Showcase Your Latest Design', 1),
(32, 6, 16, 'Figma and Adobe XD are both great tools, but I can’t decide which one I prefer. What’s your experience — which one do you use and why?', '2024-07-15', 'Figma vs Adobe XD', 1),
(33, 20, 17, 'Project management tools are a lifesaver for startups. From Notion to Asana, there are so many options. What’s your favorite and why?', '2024-07-25', 'Top Tools for Startup Management', 1),
(34, 10, 17, 'Early funding decisions can make or break a startup. Would you rather bootstrap your project or go for seed investors early on?', '2024-08-02', 'Bootstrap vs Seed Funding', 1),
(35, 21, 18, 'Every artist has an art style that inspires them. For me, it’s surrealism — the dreamlike feel always gets me. What style fuels your creativity?', '2024-08-16', 'What Art Style Inspires You Most?', 0),
(36, 23, 18, 'I’ve been playing around with digital watercolor brushes lately, and the results are fascinating. It’s amazing how natural they can feel on screen.', '2024-08-25', 'Experimenting with Digital Watercolor', 1),
(37, 24, 19, 'Personal finance can be tricky, but one solid tip can change everything. What’s the best money management advice you’ve ever received?', '2024-09-03', 'Best Personal Finance Tips', 1),
(38, 26, 19, 'Tracking expenses efficiently has been a game-changer for me. Apps and spreadsheets help a lot, but discipline matters most. How do you track yours?', '2024-09-10', 'How to Track Your Expenses', 1),
(39, 27, 20, 'Watching sports is fun, but playing them is even better. What’s your favorite sport to play — the one that keeps you active and happy?', '2024-09-20', 'Favorite Sports to Play', 1),
(40, 28, 20, 'I recently started rock climbing, and it’s been both challenging and rewarding. Any tips for beginners trying to build grip strength or confidence?', '2024-09-28', 'Rock Climbing Tips for Beginners', 1),
(41, 30, 21, 'Just began learning Python and I’m loving it so far! Any advice, resources, or beginner-friendly projects you’d recommend?', '2024-10-05', 'Getting Started with Python', 1),
(42, 32, 21, 'VS Code is such a powerful editor. What are your favorite extensions that make coding easier or more enjoyable?', '2024-10-12', 'Must-Have VS Code Extensions', 1),
(43, 33, 22, 'People often confuse UI and UX, but they serve different purposes. In your opinion, what truly separates great UI from great UX?', '2024-10-22', 'UI vs UX — What’s the Real Difference?', 1),
(44, 35, 22, 'Minimalism in design is powerful when used right. It helps focus attention and create clarity, but it’s easy to overdo. What’s your take on minimalist design?', '2024-10-29', 'The Power of Minimalist Design', 1),
(45, 36, 23, 'Let’s share some laughs! Drop your best meme of the week — anything goes, as long as it’s funny and wholesome.', '2024-11-06', 'Share Your Funniest Meme of the Week', 1),
(46, 38, 23, 'Reddit memes used to be amazing, but lately the humor feels different. Do you think meme culture is evolving or just recycling itself?', '2024-11-13', 'What Happened to Reddit Memes?', 1),
(47, 39, 24, 'National parks are incredible escapes into nature. Which one is your favorite, and what makes it special to you?', '2024-11-22', 'Favorite National Parks', 1),
(48, 5, 24, 'I’ve been thinking about trying solo camping for the first time. For those who’ve done it, any essential tips or safety advice?', '2024-12-03', 'Tips for Solo Camping Adventures', 1),
(49, 1, 25, 'Balancing work and parenting can feel impossible some days. How do you manage your time and still find moments for yourself?', '2024-12-10', 'Balancing Work and Parenting', 1),
(50, 3, 25, 'Educational shows for kids have come a long way. Any recommendations for shows that are both entertaining and genuinely educational?', '2024-12-16', 'Best Educational Shows for Kids', 1),
(51, 4, 26, 'Burnout is real, and it can sneak up on you fast. What strategies have helped you recover or prevent it in the first place?', '2025-01-03', 'Dealing with Burnout Effectively', 1),
(52, 9, 26, 'Therapy has done wonders for me. I never expected it to make such a big difference. There’s truly no shame in seeking help when you need it.', '2025-01-10', 'How Therapy Changed My Life', 1),
(53, 10, 27, 'I’ve been testing a few language learning apps lately. Duolingo, Babbel, and Memrise all have pros and cons. What’s been the best for you?', '2025-01-22', 'Best Apps for Learning Languages', 1),
(54, 12, 27, 'I recently started learning Japanese and I’m hooked! The grammar is tricky though — anyone got resources or study tips to share?', '2025-01-30', 'Learning Japanese — Need Grammar Tips', 1),
(55, 13, 28, 'AI is becoming capable of writing, designing, and composing music. Do you think creative professionals will be replaced, or will AI just become another tool?', '2025-02-08', 'Will AI Replace Creative Jobs?', 1),
(56, 14, 28, 'Automation is happening faster than most realize. From customer service bots to AI-driven art, it’s reshaping industries. How do we adapt?', '2025-02-16', 'The Rapid Rise of Automation', 1),
(57, 16, 29, 'Champions League predictions, anyone? This season has been full of surprises. Who do you think will take the trophy?', '2025-03-03', 'Champions League Predictions 2025', 1),
(58, 17, 29, 'This NBA season has been absolutely wild — unexpected upsets and breakout performances everywhere. Who’s your favorite to win it all?', '2025-03-11', 'Unpredictable NBA Season 2025', 0),
(59, 19, 30, 'Tech is evolving faster than ever. What do you think will be the next major breakthrough — quantum computing, AI, or something else entirely?', '2025-03-25', 'Predicting the Next Big Tech Breakthrough', 1),
(60, 21, 30, 'AI assistants are getting eerily good. From writing essays to managing tasks, they’re everywhere. Should we be excited or a little worried?', '2025-04-03', 'Should We Be Worried About AI Assistants?', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reports`
--

CREATE TABLE `reports` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `reason` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `reports`
--

INSERT INTO `reports` (`id`, `user_id`, `reason`) VALUES
(2, 12, 'Spamming links in multiple communities.'),
(4, 33, 'Posting off-topic or irrelevant content repeatedly.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(7) NOT NULL,
  `name` varchar(30) NOT NULL,
  `display_name` varchar(50) NOT NULL,
  `role` char(1) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(254) NOT NULL,
  `description` varchar(200) NOT NULL,
  `blocked` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `name`, `display_name`, `role`, `password`, `email`, `description`, `blocked`) VALUES
(1, 'alex_13', 'Alex 13', 'U', 'IB8yQiCjvRDvRyIKjN2ebW/5vYnz/2vvIzbNqJ3Ekps=', 'alex13@example.hu', 'Számítástechnika iránt érdeklődő felhasználó, hobbiból programoz.', 0),
(2, 'kovacs_peti', 'Kovács Peti', 'U', 'gv4eNyjeRObNHn1xvIPAzuaVF+ofK70t/TzSxJpdNs8=', 'peti.kovacs@example.hu', 'Gyakorló webfejlesztő, szeret blogolni.', 0),
(3, 'noemi88', 'Noémi', 'U', 'bncAjaladsHN5F8htwwAPh5vE8i+3w09+dZugwyzgCc=', 'noemi88@mail.hu', 'Fotós és természetbarát.', 0),
(4, 'marci_admin', 'Marci', 'A', 'cOGhozE7fZ7A8AZ9+pVCXMerllTiK14UdYqqf5sACy8=', 'marci.admin@example.hu', 'Rendszergazda, felelős a rendszer üzemeltetéséért.', 0),
(5, 'zsuzsi_m', 'Zsuzsi', 'M', 'GNU71GACUpL/vzD2fB3VH2XvWEsg0INdVO4bmgAB1Cw=', 'zsuzsi.moder@example.com', 'Moderátor, fórum szabályok felügyelője.', 0),
(6, 'balazs_k', 'Balázs', 'U', 'Ew9AKVixoCH5ZJkwXIASid8lnZh6GeF+h58abgMvQ7o=', 'balazs.k@example.hu', 'Backend fejlesztő, SQL lelkes.', 1),
(7, 'anna_92', 'Anna', 'U', 'FgH3MGQE6OM/ZyxGegLdys7TPwPJEzFSUIoNgL0dwTw=', 'anna92@example.hu', 'Grafikus, UI/UX iránt érdeklődik.', 0),
(8, 'tamask', 'Tamás K.', 'M', 'btPKbvlpnaz+uz18loj8ATTgx7+ng+pwJqPibQUbmfY=', 'tamas.k@example.com', 'Tapasztalt moderátor, közösségépítő.', 0),
(9, 'zsombi', 'Zsombi', 'U', '3Qv4hFDMZYI/PvLLkWKlR7FfC+0xncSHiuQmKxVGkSo=', 'zsombi@example.hu', 'Diák és játékfejlesztő gyakornok.', 0),
(10, 'petra_v', 'Petra Varga', 'U', 'B8Y3Wv+nXOclI0zSiIloNjgS2xRS8cB+nUMeOgueClQ=', 'petra.varga@mail.com', 'Tartalomkészítő, podcast házigazda.', 0),
(11, 'gabor_admin', 'Gábor', 'A', '+n7zxwrwl8fnrLa+2Kx9m/sssOiQeMn0BKisG4zItyg=', 'gabor.admin@example.hu', 'Fő adminisztrátor, biztonsági feladatokkal.', 0),
(12, 'erika_b', 'Erika', 'U', '0qeBDVgbwaXFRpsu+YZGka74oa1+anX4DjBWF3gTPUs=', 'erika.b@example.hu', 'Marketing szakértő, social media menedzser.', 0),
(13, 'laci_77', 'Laci', 'U', 'V2da46feIRnK1tXThmokJuLwxjgvshvFJeYxJHqoLmI=', 'laci77@example.hu', 'Hardverhobbista, retro számítógépekért rajong.', 1),
(14, 'kata_92', 'Kata', 'U', 'nPiaUPTJwD4IT+54vl7hBr7XrtD7mMC4IE94Q3X/vC4=', 'kata92@mail.hu', 'UX kutató, felhasználói tesztek vezetője.', 0),
(15, 'andras_m', 'András', 'M', 'hEidA4D45nhp7w7DGVOGboBRBs29yIPLgLT2eN19Zvw=', 'andras.moder@example.com', 'Moderátor, kommentek és viták kezelése.', 0),
(16, 'dora_sz', 'Dóra', 'U', '0TxuCPQ5LVlGr/t9aewxcqpWYhiBL987uz6Uf0lyp/Q=', 'dora.sz@example.hu', 'Frontend fejlesztő, React rajongó.', 0),
(17, 'zsolti', 'Zsolti', 'U', 'HtU1yxiFmILdbxhciMP3FnKuPxlntJUFCKAltBD6/FI=', 'zsolti@example.com', 'DevOps érdeklődésű mérnök.', 0),
(18, 'melinda', 'Melinda', 'U', 'cmrUeVyN5A/0G0gl9V+4Ie7X50wtOlQ4MWz5YeiGKc0=', 'melinda@mail.hu', 'Ügyfélszolgálatos, segítőkész és türelmes.', 0),
(19, 'robert_p', 'Róbert', 'U', 'QjQyc1tYsGoQveaMSjHL4+5LYEMBSHxENN1A2BWOC0I=', 'robert.p@example.hu', 'Adatbázis adminisztrátor gyakornok.', 0),
(20, 'agnes_k', 'Ágnes', 'U', 'ccdhDyPh6D6gKPtbQ7XGoHEan1/yzKMFXueLpLLD8DU=', 'agnes.k@example.com', 'Tartalommoderátor és cikkíró.', 1),
(21, 'miklos', 'Miklós', 'M', 'G5Rry6FWBSj42seSCjQl7oF/t14kyGsS8MBH0nHOjnc=', 'miklos.moder@example.hu', 'Tapasztalt fórummoderátor, közösségi szabályokért felel.', 0),
(22, 'zita', 'Zita', 'U', '7ce4q/peCTnUi4qRpbPoXLtQtbs5wrIvlPvi1l/zb/g=', 'zita@example.hu', 'Tanár, oktatási témákról ír a fórumon.', 0),
(23, 'istvan_r', 'István', 'U', 'QUaV7duGB8kSSt6s1F9BoSSL8j8SPDZH6cpWDGH/FZw=', 'istvan.r@example.com', 'Szabadúszó programozó, API-k szerelmese.', 0),
(24, 'bea_sz', 'Bea', 'U', 'sNO+17nh54sOi6wrNywaYZFwhhT2qh2hlgLiGa9Xwao=', 'bea.sz@example.hu', 'Termékmenedzser, stratégiai gondolkodó.', 0),
(25, 'julia', 'Júlia', 'U', '5uHOEc8DumVwLfWT2tvZnEEuJXwy7ZMluLqYVddadnI=', 'julia@example.com', 'Közösségi média szakértő, kreatív tartalomgyártó.', 1),
(26, 'tamas_x', 'Tamás X', 'U', 'm9SOMaDPlswoHgtlgI4es9XeNTxbRBjGGESWXvFrtWY=', 'tamas.x@example.hu', 'Szoftvertesztelő, automatizálási rajongó.', 0),
(27, 'gigi', 'Gigi', 'U', 'hVHeMTb8bM0SSQMrqnATMvZl77jWNNnI2F9STebxTjo=', 'gigi@example.hu', 'Designerek közösségének aktív tagja.', 0),
(28, 'roland', 'Roland', 'M', 'hx8OprGbnbZs1jOhq7wc02dXKQLcwRHCnykgTHmxgqw=', 'roland.moder@example.com', 'Moderator, főként technikai témákat kezel.', 0),
(29, 'nora', 'Nóra', 'U', 'IdzQkJMxi+6DUAe37LFssWWsIF4oU+uNgnj6tyiv17c=', 'nora@example.hu', 'Könyvmoly, irodalmi fórumok gyakori résztvevője.', 0),
(30, 'szabi', 'Szabi', 'U', '3g8aXl7ji3uNOL0Zp+kbFBIyUIaNPDVjU5+z/AuyafI=', 'szabi@example.com', 'Mobilalkalmazás fejlesztő, Kotlin és Swift felhasználó.', 0),
(31, 'veronika', 'Veronika', 'U', '7qMJRw7A9U0tPkx6QxHq/GtAtaIV9dea7wK7h/pAlfk=', 'veronika@mail.hu', 'Projektmenedzser, SCRUM mániás.', 0),
(32, 'gabor_p', 'Gábor P.', 'U', 'QAgRV2zzbasm2ehpBq4mrlyR10xzV6rtngUF9LutjkY=', 'gabor.p@example.hu', 'Hálózati mérnök, biztonságorientált.', 0),
(33, 'david', 'Dávid', 'U', 'ACTjR5kS39GpNhDIyn14u170YE3/+vLy8vpFNWsK/ek=', 'david@example.com', 'Videószerkesztő, multimédia szakember.', 0),
(34, 'ruzsa', 'Ruzsa', 'U', 'GLyEr5HbjdTA2tuKou9QmOskQRmn1hhlURo6ocOIwh8=', 'ruzsa@example.hu', 'Startup alapító, üzleti mentor.', 0),
(35, 'fanni', 'Fanni', 'U', 'FMuA6YYQ8xAFeuFJdD1rYslwPNi4LaaJ7NKz8xqRgCU=', 'fanni@example.com', 'Junior fejlesztő, tanulási fázisban.', 1),
(36, 'endre', 'Endre', 'M', 'bv+wflIcH/QxqW5RVqtE+9cHrI9kWJ2P+gfVBRKdoV8=', 'endre.moder@example.com', 'Moderator és technikai segéd.', 0),
(37, 'ilona', 'Ilona', 'U', 'H4PY17KphYOwc/3I9UfXDJnY51Q/DcPu9QIH1csgW2o=', 'ilona@example.hu', 'HR szakértő, közösségi események szervezője.', 0),
(38, 'pal', 'Pál', 'U', '+y0AdaSRChL6omSu17hfACiXDWW7lZBh9afE85jSduE=', 'pal@example.com', 'Tanácsadó, üzletfejlesztési tapasztalattal.', 0),
(39, 'marta', 'Márta', 'U', '9FamsruWNEvMcNfZYFTs3USzzlV7g4rYggBTyqHfUq8=', 'marta@mail.hu', 'Bloggerek között aktív, életmód témákban publikál.', 0),
(40, 'istvan_b', 'István B.', 'U', 'Te/ouF+f4AUbj0U5oCLvX5ZsTGBZYn14P2GgG4QTdig=', 'istvan.b@example.hu', 'Jogász, adatvédelmi témákkal foglalkozik.', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `votes`
--

CREATE TABLE `votes` (
  `id` int(10) NOT NULL,
  `post_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `type` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `votes`
--

INSERT INTO `votes` (`id`, `post_id`, `user_id`, `type`) VALUES
(1, 1, 7, 'U'),
(2, 1, 13, 'U'),
(3, 2, 4, 'D'),
(4, 2, 8, 'U'),
(5, 3, 1, 'U'),
(6, 3, 20, 'D'),
(7, 4, 10, 'U'),
(8, 5, 15, 'U'),
(9, 5, 28, 'U'),
(10, 6, 5, 'D'),
(11, 6, 6, 'U'),
(12, 7, 6, 'U'),
(13, 7, 12, 'U'),
(14, 8, 9, 'D'),
(15, 8, 11, 'U'),
(16, 9, 16, 'U'),
(17, 9, 17, 'U'),
(18, 10, 8, 'D'),
(19, 10, 22, 'U'),
(20, 11, 3, 'U'),
(21, 12, 11, 'D'),
(22, 12, 14, 'U'),
(23, 13, 12, 'U'),
(24, 13, 19, 'D'),
(25, 14, 33, 'U'),
(26, 14, 35, 'U'),
(27, 15, 17, 'D'),
(28, 15, 21, 'U'),
(29, 16, 36, 'U'),
(30, 17, 14, 'U'),
(31, 17, 25, 'D'),
(32, 18, 25, 'U'),
(33, 18, 27, 'U'),
(34, 19, 22, 'D'),
(35, 19, 26, 'U'),
(36, 20, 38, 'U'),
(37, 21, 3, 'U'),
(38, 21, 4, 'D'),
(39, 22, 24, 'U'),
(40, 23, 2, 'U'),
(41, 23, 7, 'U'),
(42, 24, 21, 'D'),
(43, 24, 29, 'U'),
(44, 25, 9, 'U'),
(45, 25, 10, 'U'),
(46, 26, 8, 'D'),
(47, 26, 11, 'U'),
(48, 27, 13, 'U'),
(49, 28, 7, 'U'),
(50, 29, 1, 'D'),
(51, 30, 15, 'U'),
(52, 31, 6, 'U'),
(53, 32, 18, 'D'),
(54, 33, 5, 'U'),
(55, 34, 20, 'U'),
(56, 35, 23, 'D'),
(57, 36, 24, 'U'),
(58, 37, 25, 'U'),
(59, 38, 27, 'D'),
(60, 39, 30, 'U'),
(61, 40, 31, 'U'),
(62, 41, 30, 'D'),
(63, 42, 33, 'U'),
(64, 43, 34, 'U'),
(65, 44, 36, 'U'),
(66, 45, 36, 'D'),
(67, 46, 38, 'U'),
(68, 47, 39, 'U'),
(69, 48, 39, 'D'),
(70, 49, 40, 'U'),
(71, 50, 1, 'U'),
(72, 51, 2, 'D'),
(73, 52, 3, 'U'),
(74, 53, 9, 'U'),
(75, 54, 10, 'U'),
(76, 55, 12, 'D'),
(77, 56, 13, 'U'),
(78, 57, 15, 'U'),
(79, 58, 17, 'D'),
(80, 59, 16, 'U'),
(81, 60, 19, 'U');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `post_id` (`post_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `communities`
--
ALTER TABLE `communities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`,`name`);

--
-- A tábla indexei `community_users`
--
ALTER TABLE `community_users`
  ADD KEY `community_id` (`community_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `user_id` (`user_id`,`community_id`),
  ADD KEY `community_id` (`community_id`);

--
-- A tábla indexei `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`,`email`),
  ADD UNIQUE KEY `id` (`id`,`name`,`email`);

--
-- A tábla indexei `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `post_id` (`post_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT a táblához `communities`
--
ALTER TABLE `communities`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT a táblához `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT a táblához `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT a táblához `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

--
-- Megkötések a táblához `community_users`
--
ALTER TABLE `community_users`
  ADD CONSTRAINT `community_users_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `community_users_ibfk_2` FOREIGN KEY (`community_id`) REFERENCES `communities` (`id`);

--
-- Megkötések a táblához `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`community_id`) REFERENCES `communities` (`id`);

--
-- Megkötések a táblához `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
