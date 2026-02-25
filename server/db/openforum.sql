-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Feb 25. 23:47
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
-- Tábla szerkezet ehhez a táblához `posts`
--

CREATE TABLE `posts` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `community_id` int(10) NOT NULL,
  `text` text NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `title` varchar(100) NOT NULL,
  `valid` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `community_id`, `text`, `date`, `title`, `valid`) VALUES
(1, 4, 1, 'AI has been evolving at an insane pace lately. From generative art to code-writing assistants, it feels like something big is just around the corner. What do you think will be the next major trend in AI tech this year, and why?', '2023-02-15 00:00:00', 'The Next Big Trend in AI', 0),
(2, 7, 1, 'I just tried the new VR headset from Meta and I’ve got to say, the performance blew me away. The visuals are crisp, the latency is minimal, and the hand tracking feels smoother than ever. Anyone else tested it yet?', '2023-03-01 00:00:00', 'First Impressions: Meta’s New VR Headset', 1),
(3, 10, 2, 'I’ve been replaying Skyrim again in 2025, and it’s still a masterpiece. The modding community keeps breathing new life into it every year. Anyone else still exploring Tamriel with new mods?', '2023-05-10 00:00:00', 'Still Playing Skyrim in 2025', 1),
(4, 20, 2, 'There are so many great indie games out right now, but Hades II really stood out for me. The art, gameplay, and soundtrack are all incredible. What’s the best indie game you’ve played recently?', '2023-05-19 00:00:00', 'Best Indie Games of the Year', 1),
(5, 5, 3, 'I finally watched Oppenheimer and I’m still thinking about it. Nolan perfectly captured the intensity and complexity of that era. The sound design alone deserves an award.', '2023-07-24 00:00:00', 'Oppenheimer: A Masterclass in Tension', 1),
(6, 28, 3, 'Just watched Dune: Part Two and I’m speechless. The visuals, the scale, and the storytelling are next-level. Villeneuve truly understands how to make sci-fi feel epic and emotional.', '2023-08-05 00:00:00', 'Dune: Part Two — A Cinematic Masterpiece', 1),
(7, 6, 4, 'There were so many amazing albums released in 2024. Personally, the Arctic Monkeys’ latest one has been on repeat for me. What about you guys — what’s your favorite album of the year?', '2023-08-25 00:00:00', 'Favorite Albums of 2024', 1),
(8, 35, 4, 'Anyone here into vaporwave? I’ve been digging into retro synth playlists lately, and it’s such a relaxing vibe. Let’s share some playlists and maybe discover hidden gems together.', '2023-09-01 00:00:00', 'Vaporwave Playlist Exchange', 1),
(9, 8, 5, 'On a rainy day, nothing beats comfort food. For me, it’s a big bowl of ramen or grilled cheese with tomato soup. What’s your ultimate comfort food when it’s gloomy outside?', '2023-09-17 00:00:00', 'Rainy Day Comfort Foods', 0),
(10, 2, 5, 'I stumbled upon a new ramen place downtown and it completely blew my mind. The broth was rich, the noodles perfectly chewy, and the vibe super cozy. Highly recommend checking it out.', '2023-09-29 00:00:00', 'Discovered a New Ramen Spot', 1),
(11, 11, 6, 'If you could travel anywhere in the world, where would you go? I’ve been daydreaming about places like Japan or New Zealand lately — both seem magical for different reasons.', '2023-10-04 00:00:00', 'Dream Travel Destinations', 1),
(12, 3, 6, 'I recently visited Iceland and it was unreal — waterfalls, glaciers, black sand beaches, and the northern lights. It’s one of those places that looks even better in person.', '2023-10-10 00:00:00', 'My Trip to Iceland', 1),
(13, 12, 7, 'Programming languages each have their charm, but everyone has a favorite. I’m curious — what’s your go-to language, and what makes it special to you?', '2023-11-06 00:00:00', 'Your Favorite Programming Language', 1),
(14, 33, 7, 'Rust is a powerhouse when it comes to performance and safety, but I’ll admit, the learning curve can be steep. Anyone else here struggled but eventually grew to love it?', '2023-11-20 00:00:00', 'Thoughts on Learning Rust', 1),
(15, 17, 8, 'Just picked up a Canon 50mm f/1.8 lens and the photos look stunning. The depth of field and sharpness are unreal for the price. Anyone else use this lens?', '2024-01-07 00:00:00', 'Testing My New 50mm Lens', 1),
(16, 36, 8, 'Photo editing tools have come a long way. Between Lightroom, Capture One, and Affinity, it’s hard to pick a favorite. What’s the best photo editing software for pros right now?', '2024-01-13 00:00:00', 'Best Photo Editing Software Today', 1),
(17, 14, 9, 'Books have always been my escape. I just started a new one and I’m curious — what are you currently reading, and would you recommend it?', '2024-02-11 00:00:00', 'What Are You Reading Right Now?', 1),
(18, 25, 9, 'I just finished “The Midnight Library” and it completely changed how I view regrets and choices. Such a moving story. Anyone else loved it as much as I did?', '2024-02-19 00:00:00', 'Finished Reading “The Midnight Library”', 1),
(19, 22, 10, 'Trying to stay consistent with workouts is tough, but finding the right routine makes all the difference. What’s your go-to workout, and how do you stay motivated?', '2024-03-07 00:00:00', 'Your Favorite Workout Routine', 1),
(20, 38, 10, 'I’ve been experimenting with intermittent fasting for a few months. The energy boost and focus are noticeable. Anyone else tried it — what was your experience like?', '2024-03-15 00:00:00', 'Experiences with Intermittent Fasting', 1),
(21, 3, 11, 'The James Webb Space Telescope just keeps delivering jaw-dropping images. The detail and clarity are unreal. Space truly never stops amazing me.', '2024-03-29 00:00:00', 'Stunning James Webb Images', 1),
(22, 24, 11, 'Time dilation around black holes is one of those concepts that blows my mind every time. The idea of time moving differently depending on gravity is wild.', '2024-04-10 00:00:00', 'Let’s Talk About Black Holes', 1),
(23, 2, 12, 'Car enthusiasts, I’m curious — what’s your favorite car brand and what makes it stand out to you? Design, performance, or reliability?', '2024-04-16 00:00:00', 'Favorite Car Brands', 0),
(24, 21, 12, 'Electric cars are evolving fast, and I truly believe they’re the future of transportation. The tech keeps getting better and charging is becoming easier.', '2024-04-25 00:00:00', 'Why Electric Cars Are the Future', 1),
(25, 9, 13, 'It’s amazing how much online learning has improved since 2020. Courses are more interactive, engaging, and affordable than ever.', '2024-05-03 00:00:00', 'The Evolution of Online Learning', 1),
(26, 27, 13, 'YouTube has become one of my main learning platforms. Channels like Kurzgesagt and CrashCourse are gold. What’s your favorite YouTube channel for learning something new?', '2024-05-12 00:00:00', 'Best YouTube Channels for Learning', 1),
(27, 13, 14, 'There are countless historical figures who don’t get the credit they deserve. Who’s someone from history you think is underrated and why?', '2024-05-26 00:00:00', 'Most Underrated Historical Figures', 1),
(28, 7, 14, 'Nikola Tesla’s work still feels ahead of its time. He paved the way for so much modern technology but rarely gets the recognition he deserves.', '2024-06-04 00:00:00', 'Why Nikola Tesla Deserves More Credit', 1),
(29, 15, 15, 'It’s hard to stay informed without drowning in bad news. How do you balance staying updated with avoiding doomscrolling?', '2024-06-12 00:00:00', 'Staying Informed Without Doomscrolling', 1),
(30, 1, 15, 'Do you still read physical newspapers or have you completely switched to digital sources? I’m curious how people consume news today.', '2024-06-25 00:00:00', 'Print vs Digital News', 1),
(31, 18, 16, 'Designers, show off what you’ve been working on lately! I’d love to see everyone’s latest design projects, big or small.', '2024-07-03 00:00:00', 'Showcase Your Latest Design', 1),
(32, 6, 16, 'Figma and Adobe XD are both great tools, but I can’t decide which one I prefer. What’s your experience — which one do you use and why?', '2024-07-15 00:00:00', 'Figma vs Adobe XD', 1),
(33, 20, 21, 'Project management tools are a lifesaver for startups. From Notion to Asana, there are so many options. What’s your favorite and why?', '2024-07-25 00:00:00', 'Top Tools for Startup Management', 1),
(34, 10, 21, 'Early funding decisions can make or break a startup. Would you rather bootstrap your project or go for seed investors early on?', '2024-08-02 00:00:00', 'Bootstrap vs Seed Funding', 1),
(35, 21, 22, 'Every artist has an art style that inspires them. For me, it’s surrealism — the dreamlike feel always gets me. What style fuels your creativity?', '2024-08-16 00:00:00', 'What Art Style Inspires You Most?', 0),
(36, 23, 22, 'I’ve been playing around with digital watercolor brushes lately, and the results are fascinating. It’s amazing how natural they can feel on screen.', '2024-08-25 00:00:00', 'Experimenting with Digital Watercolor', 1),
(37, 24, 20, 'Personal finance can be tricky, but one solid tip can change everything. What’s the best money management advice you’ve ever received?', '2024-09-03 00:00:00', 'Best Personal Finance Tips', 1),
(38, 26, 20, 'Tracking expenses efficiently has been a game-changer for me. Apps and spreadsheets help a lot, but discipline matters most. How do you track yours?', '2024-09-10 00:00:00', 'How to Track Your Expenses', 1),
(39, 27, 30, 'Watching sports is fun, but playing them is even better. What’s your favorite sport to play — the one that keeps you active and happy?', '2024-09-20 00:00:00', 'Favorite Sports to Play', 1),
(40, 28, 10, 'I recently started rock climbing, and it’s been both challenging and rewarding. Any tips for beginners trying to build grip strength or confidence?', '2024-09-28 00:00:00', 'Rock Climbing Tips for Beginners', 1),
(41, 30, 23, 'Just began learning Python and I’m loving it so far! Any advice, resources, or beginner-friendly projects you’d recommend?', '2024-10-05 00:00:00', 'Getting Started with Python', 1),
(42, 32, 23, 'VS Code is such a powerful editor. What are your favorite extensions that make coding easier or more enjoyable?', '2024-10-12 00:00:00', 'Must-Have VS Code Extensions', 1),
(43, 33, 16, 'People often confuse UI and UX, but they serve different purposes. In your opinion, what truly separates great UI from great UX?', '2024-10-22 00:00:00', 'UI vs UX — What’s the Real Difference?', 1),
(44, 35, 16, 'Minimalism in design is powerful when used right. It helps focus attention and create clarity, but it’s easy to overdo. What’s your take on minimalist design?', '2024-10-29 00:00:00', 'The Power of Minimalist Design', 1),
(45, 36, 24, 'Let’s share some laughs! Drop your best meme of the week — anything goes, as long as it’s funny and wholesome.', '2024-11-06 00:00:00', 'Share Your Funniest Meme of the Week', 1),
(46, 38, 24, 'Reddit memes used to be amazing, but lately the humor feels different. Do you think meme culture is evolving or just recycling itself?', '2024-11-13 00:00:00', 'What Happened to Reddit Memes?', 1),
(47, 39, 25, 'National parks are incredible escapes into nature. Which one is your favorite, and what makes it special to you?', '2024-11-22 00:00:00', 'Favorite National Parks', 1),
(48, 5, 25, 'I’ve been thinking about trying solo camping for the first time. For those who’ve done it, any essential tips or safety advice?', '2024-12-03 00:00:00', 'Tips for Solo Camping Adventures', 1),
(49, 1, 19, 'Balancing work and parenting can feel impossible some days. How do you manage your time and still find moments for yourself?', '2024-12-10 00:00:00', 'Balancing Work and Parenting', 1),
(50, 3, 13, 'Educational shows for kids have come a long way. Any recommendations for shows that are both entertaining and genuinely educational?', '2024-12-16 00:00:00', 'Best Educational Shows for Kids', 1),
(51, 4, 19, 'Burnout is real, and it can sneak up on you fast. What strategies have helped you recover or prevent it in the first place?', '2025-01-03 00:00:00', 'Dealing with Burnout Effectively', 1),
(52, 9, 19, 'Therapy has done wonders for me. I never expected it to make such a big difference. There’s truly no shame in seeking help when you need it.', '2025-01-10 00:00:00', 'How Therapy Changed My Life', 1),
(53, 10, 28, 'I’ve been testing a few language learning apps lately. Duolingo, Babbel, and Memrise all have pros and cons. What’s been the best for you?', '2025-01-22 00:00:00', 'Best Apps for Learning Languages', 1),
(54, 12, 28, 'I recently started learning Japanese and I’m hooked! The grammar is tricky though — anyone got resources or study tips to share?', '2025-01-30 00:00:00', 'Learning Japanese — Need Grammar Tips', 1),
(55, 13, 1, 'AI is becoming capable of writing, designing, and composing music. Do you think creative professionals will be replaced, or will AI just become another tool?', '2025-02-08 00:00:00', 'Will AI Replace Creative Jobs?', 1),
(56, 14, 1, 'Automation is happening faster than most realize. From customer service bots to AI-driven art, it’s reshaping industries. How do we adapt?', '2025-02-16 00:00:00', 'The Rapid Rise of Automation', 1),
(57, 16, 30, 'Champions League predictions, anyone? This season has been full of surprises. Who do you think will take the trophy?', '2025-03-03 00:00:00', 'Champions League Predictions 2025', 1),
(58, 17, 10, 'This NBA season has been absolutely wild — unexpected upsets and breakout performances everywhere. Who’s your favorite to win it all?', '2025-03-11 00:00:00', 'Unpredictable NBA Season 2025', 0),
(59, 19, 1, 'Tech is evolving faster than ever. What do you think will be the next major breakthrough — quantum computing, AI, or something else entirely?', '2025-03-25 00:00:00', 'Predicting the Next Big Tech Breakthrough', 1),
(60, 21, 1, 'AI assistants are getting eerily good. From writing essays to managing tasks, they’re everywhere. Should we be excited or a little worried?', '2025-04-03 00:00:00', 'Should We Be Worried About AI Assistants?', 1),
(63, 51, 34, 'Welcome to this soon to be beautiful community!\nHope you find the anwsers you\'re looking for!\nHave a good time!', '2026-02-25 22:29:08', 'Welcome!', 1),
(64, 50, 35, 'Welcome to this soon to be beautiful community! Hope you find the anwsers you\'re looking for! Have a good time!', '2026-02-25 22:32:51', 'Welcome!', 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `user_id` (`user_id`,`community_id`),
  ADD KEY `community_id` (`community_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`community_id`) REFERENCES `communities` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
