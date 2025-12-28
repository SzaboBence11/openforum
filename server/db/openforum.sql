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
  `valid` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `user_id`, `text`, `date`, `valid`) VALUES
(1, 1, 7, 'Totally agree, AI development is accelerating faster than ever.', '2023-02-18', 'y'),
(2, 1, 13, 'I think we’ll see major improvements in generative video soon.', '2023-02-20', 'y'),
(3, 2, 4, 'VR is cool but still too pricey for mainstream users.', '2023-03-05', 'y'),
(4, 3, 1, 'Haha yes! I still mod Skyrim every few months.', '2023-05-12', 'y'),
(5, 3, 20, 'Try Enderal if you haven’t yet — amazing mod story.', '2023-05-14', 'y'),
(6, 4, 10, 'Hades II is definitely a strong contender this year.', '2023-05-21', 'y'),
(7, 5, 15, 'Oppenheimer was pure cinematic genius.', '2023-07-26', 'y'),
(8, 5, 28, 'Nolan never disappoints with sound design either.', '2023-07-28', 'y'),
(9, 6, 5, 'Can’t wait for Dune: Part Three already!', '2023-08-10', 'y'),
(10, 7, 6, 'That album was on repeat for weeks for me too.', '2023-08-27', 'y'),
(11, 8, 9, 'Vaporwave will never die.', '2023-09-03', 'y'),
(12, 9, 16, 'Pizza, every single time.', '2023-09-18', 'y'),
(13, 10, 8, 'I love ramen too! What’s the restaurant called?', '2023-09-30', 'y'),
(14, 11, 3, 'Japan is top of my list — the culture and food!', '2023-10-07', 'y'),
(15, 12, 11, 'Iceland is on my bucket list for sure.', '2023-10-11', 'y'),
(16, 13, 12, 'Python all the way, can’t beat the versatility.', '2023-11-09', 'y'),
(17, 13, 19, 'Go is great for backend systems though.', '2023-11-13', 'y'),
(18, 14, 33, 'Rust ownership model is tough, but worth it.', '2023-11-23', 'y'),
(19, 15, 17, 'Nice choice! The 50mm lens is perfect for portraits.', '2024-01-10', 'y'),
(20, 16, 36, 'Lightroom is my go-to editing software.', '2024-01-14', 'y'),
(21, 17, 14, 'Currently reading “Project Hail Mary” – absolutely loved it.', '2024-02-13', 'y'),
(22, 18, 25, 'That one is on my reading list too.', '2024-02-20', 'y'),
(23, 19, 22, 'Push-pull workouts are efficient for sure.', '2024-03-10', 'y'),
(24, 20, 38, 'I tried fasting too, helped a lot with energy levels.', '2024-03-17', 'y'),
(25, 21, 3, 'Webb’s images are mind-blowing, truly cosmic art.', '2024-03-31', 'y'),
(26, 22, 24, 'Time dilation is one of the most fascinating concepts in physics.', '2024-04-12', 'y'),
(27, 23, 2, 'Tesla for me — innovation and design.', '2024-04-18', 'y'),
(28, 24, 21, 'EVs are getting better but range anxiety is real.', '2024-04-26', 'y'),
(29, 25, 9, 'I learned more from YouTube than in school, lol.', '2024-05-05', 'y'),
(30, 26, 8, 'Khan Academy is still the best free platform.', '2024-05-14', 'y'),
(31, 27, 13, 'Tesla was indeed way ahead of his time.', '2024-05-27', 'y'),
(32, 28, 7, 'Agreed, Tesla deserves way more credit.', '2024-06-06', 'y'),
(33, 29, 1, 'I only read digital newspapers now.', '2024-06-26', 'y'),
(34, 31, 6, 'I prefer Figma for prototypes.', '2024-07-05', 'y'),
(35, 32, 18, 'Adobe XD feels outdated these days.', '2024-07-16', 'y'),
(36, 35, 23, 'Watercolor is beautiful when done digitally.', '2024-08-27', 'y'),
(37, 37, 25, 'I use Notion to track expenses, works great.', '2024-09-11', 'y'),
(38, 41, 30, 'VS Code + Copilot = dream setup.', '2024-10-13', 'y'),
(39, 45, 36, 'Meme quality dropping across the internet sadly.', '2024-11-15', 'y'),
(40, 48, 39, 'Camping solo is peaceful, but always stay alert.', '2024-12-05', 'y'),
(41, 53, 9, 'Seeking help is a sign of strength, not weakness.', '2025-01-12', 'y'),
(42, 59, 16, 'This year’s Champions League is unpredictable.', '2025-03-05', 'y'),
(43, 60, 19, 'We might already be living with AI smarter than we think.', '2025-03-27', 'y');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `communities`
--

CREATE TABLE `communities` (
  `id` int(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `valid` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `communities`
--

INSERT INTO `communities` (`id`, `name`, `description`, `date`, `valid`) VALUES
(1, 'tech', 'Minden, ami technológia – hírek, trendek, eszközök és fejlesztések.', '2023-02-11', 'y'),
(2, 'gaming', 'Játékosok közössége: PC, konzol, mobil és indie game-ek.', '2023-05-04', 'y'),
(3, 'movies', 'Filmek, sorozatok, kritikák és ajánlók minden műfajban.', '2023-07-22', 'y'),
(4, 'music', 'Zeneimádók fóruma: műfajok, előadók, új megjelenések.', '2023-08-19', 'y'),
(5, 'food', 'Receptek, gasztrotippek, éttermek és főzési tanácsok.', '2023-09-15', 'y'),
(6, 'travel', 'Utazási élmények, tippek, látványosságok a világ minden tájáról.', '2023-11-02', 'y'),
(7, 'programming', 'Fejlesztők fóruma – kód, technológiák és hibakeresés.', '2024-01-05', 'y'),
(8, 'photography', 'Fotósok közössége, technikák, felszerelések és inspiráció.', '2024-02-13', 'y'),
(9, 'books', 'Könyvek, írók, olvasási tippek és irodalmi beszélgetések.', '2024-03-22', 'n'),
(10, 'fitness', 'Egészség, sport, edzéstervek és motivációs történetek.', '2024-04-17', 'y'),
(11, 'science', 'Tudományos felfedezések, kutatások és elméletek vitafóruma.', '2024-05-09', 'y'),
(12, 'cars', 'Autók, motorok, tuning és közlekedési témák.', '2024-06-11', 'y'),
(13, 'education', 'Tanulás, oktatás, vizsgák és diákélet minden szinten.', '2024-07-03', 'y'),
(14, 'history', 'Történelem, régészet, érdekes múltbeli események.', '2024-08-27', 'y'),
(15, 'news', 'Aktuális események, politika és világhelyzet megvitatása.', '2024-09-14', 'y'),
(16, 'design', 'Grafika, UI/UX, webdesign és kreatív alkotások.', '2024-10-08', 'y'),
(17, 'fashion', 'Divat, stílus, trendek és öltözködési tanácsok.', '2024-11-02', 'y'),
(18, 'pets', 'Háziállatok, gondozás, tippek és kedvenc sztorik.', '2024-12-12', 'y'),
(19, 'relationships', 'Kapcsolatok, párkapcsolati tanácsok és emberi történetek.', '2025-01-06', 'y'),
(20, 'finance', 'Pénzügy, befektetés, megtakarítás és gazdasági hírek.', '2025-01-24', 'n'),
(21, 'startup', 'Vállalkozók és startup alapítók fóruma.', '2025-02-17', 'y'),
(22, 'art', 'Festészet, szobrászat, digitális művészet és alkotói folyamatok.', '2025-03-05', 'y'),
(23, 'coding_help', 'Programozási segítségkérés és tudásmegosztás.', '2025-03-28', 'y'),
(24, 'memes', 'Humor, mémek és közösségi szórakozás.', '2025-04-15', 'n'),
(25, 'nature', 'Természet, környezetvédelem és fenntarthatóság.', '2025-05-09', 'y'),
(26, 'parenting', 'Gyermeknevelés, családi élet és szülői tapasztalatok.', '2025-06-01', 'y'),
(27, 'psychology', 'Lélektan, önismeret és mentális egészség.', '2025-07-18', 'y'),
(28, 'languages', 'Nyelvtanulás, fordítás és többnyelvű beszélgetések.', '2025-08-23', 'y'),
(29, 'ai_and_future', 'Mesterséges intelligencia, automatizáció és jövőkutatás.', '2025-09-20', 'y'),
(30, 'sports', 'Foci, kosár, e-sport és minden, ami mozgás.', '2025-10-10', 'n');

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
  `valid` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `community_id`, `text`, `date`, `title`, `valid`) VALUES
(1, 4, 1, 'AI has been evolving at an insane pace lately. From generative art to code-writing assistants, it feels like something big is just around the corner. What do you think will be the next major trend in AI tech this year, and why?', '2023-02-15', 'The Next Big Trend in AI', 'n'),
(2, 7, 1, 'I just tried the new VR headset from Meta and I’ve got to say, the performance blew me away. The visuals are crisp, the latency is minimal, and the hand tracking feels smoother than ever. Anyone else tested it yet?', '2023-03-01', 'First Impressions: Meta’s New VR Headset', 'y'),
(3, 10, 2, 'I’ve been replaying Skyrim again in 2025, and it’s still a masterpiece. The modding community keeps breathing new life into it every year. Anyone else still exploring Tamriel with new mods?', '2023-05-10', 'Still Playing Skyrim in 2025', 'y'),
(4, 20, 2, 'There are so many great indie games out right now, but Hades II really stood out for me. The art, gameplay, and soundtrack are all incredible. What’s the best indie game you’ve played recently?', '2023-05-19', 'Best Indie Games of the Year', 'y'),
(5, 5, 3, 'I finally watched Oppenheimer and I’m still thinking about it. Nolan perfectly captured the intensity and complexity of that era. The sound design alone deserves an award.', '2023-07-24', 'Oppenheimer: A Masterclass in Tension', 'y'),
(6, 28, 3, 'Just watched Dune: Part Two and I’m speechless. The visuals, the scale, and the storytelling are next-level. Villeneuve truly understands how to make sci-fi feel epic and emotional.', '2023-08-05', 'Dune: Part Two — A Cinematic Masterpiece', 'y'),
(7, 6, 4, 'There were so many amazing albums released in 2024. Personally, the Arctic Monkeys’ latest one has been on repeat for me. What about you guys — what’s your favorite album of the year?', '2023-08-25', 'Favorite Albums of 2024', 'y'),
(8, 35, 4, 'Anyone here into vaporwave? I’ve been digging into retro synth playlists lately, and it’s such a relaxing vibe. Let’s share some playlists and maybe discover hidden gems together.', '2023-09-01', 'Vaporwave Playlist Exchange', 'y'),
(9, 8, 5, 'On a rainy day, nothing beats comfort food. For me, it’s a big bowl of ramen or grilled cheese with tomato soup. What’s your ultimate comfort food when it’s gloomy outside?', '2023-09-17', 'Rainy Day Comfort Foods', 'n'),
(10, 2, 5, 'I stumbled upon a new ramen place downtown and it completely blew my mind. The broth was rich, the noodles perfectly chewy, and the vibe super cozy. Highly recommend checking it out.', '2023-09-29', 'Discovered a New Ramen Spot', 'y'),
(11, 11, 6, 'If you could travel anywhere in the world, where would you go? I’ve been daydreaming about places like Japan or New Zealand lately — both seem magical for different reasons.', '2023-10-04', 'Dream Travel Destinations', 'y'),
(12, 3, 6, 'I recently visited Iceland and it was unreal — waterfalls, glaciers, black sand beaches, and the northern lights. It’s one of those places that looks even better in person.', '2023-10-10', 'My Trip to Iceland', 'y'),
(13, 12, 7, 'Programming languages each have their charm, but everyone has a favorite. I’m curious — what’s your go-to language, and what makes it special to you?', '2023-11-06', 'Your Favorite Programming Language', 'y'),
(14, 33, 7, 'Rust is a powerhouse when it comes to performance and safety, but I’ll admit, the learning curve can be steep. Anyone else here struggled but eventually grew to love it?', '2023-11-20', 'Thoughts on Learning Rust', 'y'),
(15, 17, 8, 'Just picked up a Canon 50mm f/1.8 lens and the photos look stunning. The depth of field and sharpness are unreal for the price. Anyone else use this lens?', '2024-01-07', 'Testing My New 50mm Lens', 'y'),
(16, 36, 8, 'Photo editing tools have come a long way. Between Lightroom, Capture One, and Affinity, it’s hard to pick a favorite. What’s the best photo editing software for pros right now?', '2024-01-13', 'Best Photo Editing Software Today', 'y'),
(17, 14, 9, 'Books have always been my escape. I just started a new one and I’m curious — what are you currently reading, and would you recommend it?', '2024-02-11', 'What Are You Reading Right Now?', 'y'),
(18, 25, 9, 'I just finished “The Midnight Library” and it completely changed how I view regrets and choices. Such a moving story. Anyone else loved it as much as I did?', '2024-02-19', 'Finished Reading “The Midnight Library”', 'y'),
(19, 22, 10, 'Trying to stay consistent with workouts is tough, but finding the right routine makes all the difference. What’s your go-to workout, and how do you stay motivated?', '2024-03-07', 'Your Favorite Workout Routine', 'y'),
(20, 38, 10, 'I’ve been experimenting with intermittent fasting for a few months. The energy boost and focus are noticeable. Anyone else tried it — what was your experience like?', '2024-03-15', 'Experiences with Intermittent Fasting', 'y'),
(21, 3, 11, 'The James Webb Space Telescope just keeps delivering jaw-dropping images. The detail and clarity are unreal. Space truly never stops amazing me.', '2024-03-29', 'Stunning James Webb Images', 'y'),
(22, 24, 11, 'Time dilation around black holes is one of those concepts that blows my mind every time. The idea of time moving differently depending on gravity is wild.', '2024-04-10', 'Let’s Talk About Black Holes', 'y'),
(23, 2, 12, 'Car enthusiasts, I’m curious — what’s your favorite car brand and what makes it stand out to you? Design, performance, or reliability?', '2024-04-16', 'Favorite Car Brands', 'n'),
(24, 21, 12, 'Electric cars are evolving fast, and I truly believe they’re the future of transportation. The tech keeps getting better and charging is becoming easier.', '2024-04-25', 'Why Electric Cars Are the Future', 'y'),
(25, 9, 13, 'It’s amazing how much online learning has improved since 2020. Courses are more interactive, engaging, and affordable than ever.', '2024-05-03', 'The Evolution of Online Learning', 'y'),
(26, 27, 13, 'YouTube has become one of my main learning platforms. Channels like Kurzgesagt and CrashCourse are gold. What’s your favorite YouTube channel for learning something new?', '2024-05-12', 'Best YouTube Channels for Learning', 'y'),
(27, 13, 14, 'There are countless historical figures who don’t get the credit they deserve. Who’s someone from history you think is underrated and why?', '2024-05-26', 'Most Underrated Historical Figures', 'y'),
(28, 7, 14, 'Nikola Tesla’s work still feels ahead of its time. He paved the way for so much modern technology but rarely gets the recognition he deserves.', '2024-06-04', 'Why Nikola Tesla Deserves More Credit', 'y'),
(29, 15, 15, 'It’s hard to stay informed without drowning in bad news. How do you balance staying updated with avoiding doomscrolling?', '2024-06-12', 'Staying Informed Without Doomscrolling', 'y'),
(30, 1, 15, 'Do you still read physical newspapers or have you completely switched to digital sources? I’m curious how people consume news today.', '2024-06-25', 'Print vs Digital News', 'y'),
(31, 18, 16, 'Designers, show off what you’ve been working on lately! I’d love to see everyone’s latest design projects, big or small.', '2024-07-03', 'Showcase Your Latest Design', 'y'),
(32, 6, 16, 'Figma and Adobe XD are both great tools, but I can’t decide which one I prefer. What’s your experience — which one do you use and why?', '2024-07-15', 'Figma vs Adobe XD', 'y'),
(33, 20, 17, 'Project management tools are a lifesaver for startups. From Notion to Asana, there are so many options. What’s your favorite and why?', '2024-07-25', 'Top Tools for Startup Management', 'y'),
(34, 10, 17, 'Early funding decisions can make or break a startup. Would you rather bootstrap your project or go for seed investors early on?', '2024-08-02', 'Bootstrap vs Seed Funding', 'y'),
(35, 21, 18, 'Every artist has an art style that inspires them. For me, it’s surrealism — the dreamlike feel always gets me. What style fuels your creativity?', '2024-08-16', 'What Art Style Inspires You Most?', 'n'),
(36, 23, 18, 'I’ve been playing around with digital watercolor brushes lately, and the results are fascinating. It’s amazing how natural they can feel on screen.', '2024-08-25', 'Experimenting with Digital Watercolor', 'y'),
(37, 24, 19, 'Personal finance can be tricky, but one solid tip can change everything. What’s the best money management advice you’ve ever received?', '2024-09-03', 'Best Personal Finance Tips', 'y'),
(38, 26, 19, 'Tracking expenses efficiently has been a game-changer for me. Apps and spreadsheets help a lot, but discipline matters most. How do you track yours?', '2024-09-10', 'How to Track Your Expenses', 'y'),
(39, 27, 20, 'Watching sports is fun, but playing them is even better. What’s your favorite sport to play — the one that keeps you active and happy?', '2024-09-20', 'Favorite Sports to Play', 'y'),
(40, 28, 20, 'I recently started rock climbing, and it’s been both challenging and rewarding. Any tips for beginners trying to build grip strength or confidence?', '2024-09-28', 'Rock Climbing Tips for Beginners', 'y'),
(41, 30, 21, 'Just began learning Python and I’m loving it so far! Any advice, resources, or beginner-friendly projects you’d recommend?', '2024-10-05', 'Getting Started with Python', 'y'),
(42, 32, 21, 'VS Code is such a powerful editor. What are your favorite extensions that make coding easier or more enjoyable?', '2024-10-12', 'Must-Have VS Code Extensions', 'y'),
(43, 33, 22, 'People often confuse UI and UX, but they serve different purposes. In your opinion, what truly separates great UI from great UX?', '2024-10-22', 'UI vs UX — What’s the Real Difference?', 'y'),
(44, 35, 22, 'Minimalism in design is powerful when used right. It helps focus attention and create clarity, but it’s easy to overdo. What’s your take on minimalist design?', '2024-10-29', 'The Power of Minimalist Design', 'y'),
(45, 36, 23, 'Let’s share some laughs! Drop your best meme of the week — anything goes, as long as it’s funny and wholesome.', '2024-11-06', 'Share Your Funniest Meme of the Week', 'y'),
(46, 38, 23, 'Reddit memes used to be amazing, but lately the humor feels different. Do you think meme culture is evolving or just recycling itself?', '2024-11-13', 'What Happened to Reddit Memes?', 'y'),
(47, 39, 24, 'National parks are incredible escapes into nature. Which one is your favorite, and what makes it special to you?', '2024-11-22', 'Favorite National Parks', 'y'),
(48, 5, 24, 'I’ve been thinking about trying solo camping for the first time. For those who’ve done it, any essential tips or safety advice?', '2024-12-03', 'Tips for Solo Camping Adventures', 'y'),
(49, 1, 25, 'Balancing work and parenting can feel impossible some days. How do you manage your time and still find moments for yourself?', '2024-12-10', 'Balancing Work and Parenting', 'y'),
(50, 3, 25, 'Educational shows for kids have come a long way. Any recommendations for shows that are both entertaining and genuinely educational?', '2024-12-16', 'Best Educational Shows for Kids', 'y'),
(51, 4, 26, 'Burnout is real, and it can sneak up on you fast. What strategies have helped you recover or prevent it in the first place?', '2025-01-03', 'Dealing with Burnout Effectively', 'y'),
(52, 9, 26, 'Therapy has done wonders for me. I never expected it to make such a big difference. There’s truly no shame in seeking help when you need it.', '2025-01-10', 'How Therapy Changed My Life', 'y'),
(53, 10, 27, 'I’ve been testing a few language learning apps lately. Duolingo, Babbel, and Memrise all have pros and cons. What’s been the best for you?', '2025-01-22', 'Best Apps for Learning Languages', 'y'),
(54, 12, 27, 'I recently started learning Japanese and I’m hooked! The grammar is tricky though — anyone got resources or study tips to share?', '2025-01-30', 'Learning Japanese — Need Grammar Tips', 'y'),
(55, 13, 28, 'AI is becoming capable of writing, designing, and composing music. Do you think creative professionals will be replaced, or will AI just become another tool?', '2025-02-08', 'Will AI Replace Creative Jobs?', 'y'),
(56, 14, 28, 'Automation is happening faster than most realize. From customer service bots to AI-driven art, it’s reshaping industries. How do we adapt?', '2025-02-16', 'The Rapid Rise of Automation', 'y'),
(57, 16, 29, 'Champions League predictions, anyone? This season has been full of surprises. Who do you think will take the trophy?', '2025-03-03', 'Champions League Predictions 2025', 'y'),
(58, 17, 29, 'This NBA season has been absolutely wild — unexpected upsets and breakout performances everywhere. Who’s your favorite to win it all?', '2025-03-11', 'Unpredictable NBA Season 2025', 'n'),
(59, 19, 30, 'Tech is evolving faster than ever. What do you think will be the next major breakthrough — quantum computing, AI, or something else entirely?', '2025-03-25', 'Predicting the Next Big Tech Breakthrough', 'y'),
(60, 21, 30, 'AI assistants are getting eerily good. From writing essays to managing tasks, they’re everywhere. Should we be excited or a little worried?', '2025-04-03', 'Should We Be Worried About AI Assistants?', 'y');

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
(1, 'alex_13', 'Alex 13', 'U', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'alex13@example.hu', 'Számítástechnika iránt érdeklődő felhasználó, hobbiból programoz.', 0),
(2, 'kovacs_peti', 'Kovács Peti', 'U', '5f4dcc3b5aa765d61d8327deb882cf99aa3f3a1b2c3d4e5f67890abcdef12345', 'peti.kovacs@example.hu', 'Gyakorló webfejlesztő, szeret blogolni.', 0),
(3, 'noemi88', 'Noémi', 'U', 'b94d27b9934d3e08a52e52d7da7dabfadeadbeef0123456789abcdefabcd1234', 'noemi88@mail.hu', 'Fotós és természetbarát.', 0),
(4, 'marci_admin', 'Marci', 'A', 'a3f5c6d7e8f90123456789abcdef0123456789abcdef0123456789abcdefabcd', 'marci.admin@example.hu', 'Rendszergazda, felelős a rendszer üzemeltetéséért.', 0),
(5, 'zsuzsi_m', 'Zsuzsi', 'M', 'c1d2e3f40123456789abcdef0123456789abcdef0123456789abcdef01234567', 'zsuzsi.moder@example.com', 'Moderátor, fórum szabályok felügyelője.', 0),
(6, 'balazs_k', 'Balázs', 'U', '0f1e2d3c4b5a69788796a5b4c3d2e1f0a1b2c3d4e5f60718293a4b5c6d7e8f90', 'balazs.k@example.hu', 'Backend fejlesztő, SQL lelkes.', 1),
(7, 'anna_92', 'Anna', 'U', '9a8b7c6d5e4f30123456789abcdef0123456789abcdef0123456789abcdefab', 'anna92@example.hu', 'Grafikus, UI/UX iránt érdeklődik.', 0),
(8, 'tamask', 'Tamás K.', 'M', '7f6e5d4c3b2a1908123456789abcdef0123456789abcdef0123456789abcdef0', 'tamas.k@example.com', 'Tapasztalt moderátor, közösségépítő.', 0),
(9, 'zsombi', 'Zsombi', 'U', '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', 'zsombi@example.hu', 'Diák és játékfejlesztő gyakornok.', 0),
(10, 'petra_v', 'Petra Varga', 'U', 'abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789', 'petra.varga@mail.com', 'Tartalomkészítő, podcast házigazda.', 0),
(11, 'gabor_admin', 'Gábor', 'A', '0a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcd12', 'gabor.admin@example.hu', 'Fő adminisztrátor, biztonsági feladatokkal.', 0),
(12, 'erika_b', 'Erika', 'U', 'fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210', 'erika.b@example.hu', 'Marketing szakértő, social media menedzser.', 0),
(13, 'laci_77', 'Laci', 'U', '11223344556677889900aabbccddeeff00112233445566778899aabbccddeeff', 'laci77@example.hu', 'Hardverhobbista, retro számítógépekért rajong.', 1),
(14, 'kata_92', 'Kata', 'U', '99aa88bb77cc66dd55ee44ff33aa22bb11cc00ddffee11223344556677889900', 'kata92@mail.hu', 'UX kutató, felhasználói tesztek vezetője.', 0),
(15, 'andras_m', 'András', 'M', '0b0c0d0e0f101112131415161718191a1b1c1d1e1f202122232425262728292a', 'andras.moder@example.com', 'Moderátor, kommentek és viták kezelése.', 0),
(16, 'dora_sz', 'Dóra', 'U', 'abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd', 'dora.sz@example.hu', 'Frontend fejlesztő, React rajongó.', 0),
(17, 'zsolti', 'Zsolti', 'U', '00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff', 'zsolti@example.com', 'DevOps érdeklődésű mérnök.', 0),
(18, 'melinda', 'Melinda', 'U', 'f0e1d2c3b4a5968778695a4b3c2d1e0f1f2e3d4c5b6a79887766554433221100', 'melinda@mail.hu', 'Ügyfélszolgálatos, segítőkész és türelmes.', 0),
(19, 'robert_p', 'Róbert', 'U', 'a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0', 'robert.p@example.hu', 'Adatbázis adminisztrátor gyakornok.', 0),
(20, 'agnes_k', 'Ágnes', 'U', 'b1c2d3e4f5061728394a5b6c7d8e9f00112233445566778899aabbccddeeff11', 'agnes.k@example.com', 'Tartalommoderátor és cikkíró.', 1),
(21, 'miklos', 'Miklós', 'M', 'c9d8e7f60123456789abcdef0123456789abcdef0123456789abcdef01234567', 'miklos.moder@example.hu', 'Tapasztalt fórummoderátor, közösségi szabályokért felel.', 0),
(22, 'zita', 'Zita', 'U', '77aa88bb99cc00dd11ee22ff33aa44bb55cc66dd77ee88ff99aa00bb11cc22dd', 'zita@example.hu', 'Tanár, oktatási témákról ír a fórumon.', 0),
(23, 'istvan_r', 'István', 'U', '3c3d3e3f404142434445464748494a4b4c4d4e4f505152535455565758595a5b', 'istvan.r@example.com', 'Szabadúszó programozó, API-k szerelmese.', 0),
(24, 'bea_sz', 'Bea', 'U', '45464748494a4b4c4d4e4f505152535455565758595a5b5c5d5e5f6061626364', 'bea.sz@example.hu', 'Termékmenedzser, stratégiai gondolkodó.', 0),
(25, 'julia', 'Júlia', 'U', '8f7e6d5c4b3a29108192a3b4c5d6e7f80112233445566778899aabbccddeeff0', 'julia@example.com', 'Közösségi média szakértő, kreatív tartalomgyártó.', 1),
(26, 'tamas_x', 'Tamás X', 'U', 'abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890', 'tamas.x@example.hu', 'Szoftvertesztelő, automatizálási rajongó.', 0),
(27, 'gigi', 'Gigi', 'U', '12131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f3031', 'gigi@example.hu', 'Designerek közösségének aktív tagja.', 0),
(28, 'roland', 'Roland', 'M', '9f8e7d6c5b4a39281716253445566778899aabbccddeeff0011223344556677', 'roland.moder@example.com', 'Moderator, főként technikai témákat kezel.', 0),
(29, 'nora', 'Nóra', 'U', '0f0e0d0c0b0a09080706050403020100ffeeddccbbaa99887766554433221100', 'nora@example.hu', 'Könyvmoly, irodalmi fórumok gyakori résztvevője.', 0),
(30, 'szabi', 'Szabi', 'U', 'abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd', 'szabi@example.com', 'Mobilalkalmazás fejlesztő, Kotlin és Swift felhasználó.', 0),
(31, 'veronika', 'Veronika', 'U', '123abc456def7890abc123def4567890abc123def4567890abc123def4567890', 'veronika@mail.hu', 'Projektmenedzser, SCRUM mániás.', 0),
(32, 'gabor_p', 'Gábor P.', 'U', 'fed123cba456fed789abc0123456789abcdef0123456789abcdef0123456789a', 'gabor.p@example.hu', 'Hálózati mérnök, biztonságorientált.', 0),
(33, 'david', 'Dávid', 'U', '0a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20212223242526272829', 'david@example.com', 'Videószerkesztő, multimédia szakember.', 0),
(34, 'ruzsa', 'Ruzsa', 'U', 'aa55bb66cc77dd88ee99ff00112233445566778899aabbccddeeff0011223344', 'ruzsa@example.hu', 'Startup alapító, üzleti mentor.', 0),
(35, 'fanni', 'Fanni', 'U', 'deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef', 'fanni@example.com', 'Junior fejlesztő, tanulási fázisban.', 1),
(36, 'endre', 'Endre', 'M', 'ffee00112233445566778899aabbccddeeff00112233445566778899aabbccdd', 'endre.moder@example.com', 'Moderator és technikai segéd.', 0),
(37, 'ilona', 'Ilona', 'U', 'aabbccddeeff00112233445566778899aabbccddeeff00112233445566778899', 'ilona@example.hu', 'HR szakértő, közösségi események szervezője.', 0),
(38, 'pal', 'Pál', 'U', '1122aabb3344ccdd5566ee77889900aabbccddeeff00112233445566778899aa', 'pal@example.com', 'Tanácsadó, üzletfejlesztési tapasztalattal.', 0),
(39, 'marta', 'Márta', 'U', '00ffee11ddcc22bb33aa44cc55dd66ee77ff889900aabbccddeeff1122334455', 'marta@mail.hu', 'Bloggerek között aktív, életmód témákban publikál.', 0),
(40, 'istvan_b', 'István B.', 'U', '99cc88bb77aa66dd55ee44ff33aa22bb11cc00ddffee11223344556677889900', 'istvan.b@example.hu', 'Jogász, adatvédelmi témákkal foglalkozik.', 0);

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
