/*
  # Add events table

  1. New Tables
    - `events`
      - `id` (int, primary key)
      - `title` (text)
      - `description` (text)
      - `imageUrl` (text)
      - `date` (timestamp)
      - `location` (text)
      - `capacity` (int)
      - `price` (int, optional)
      - `createdAt` (timestamp)
      - `updatedAt` (timestamp)

  2. Sample Data
    - Adds initial event records
*/

CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  imageUrl TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  price INTEGER,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT now(),
  updatedAt TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert sample events
INSERT INTO events (title, description, imageUrl, date, location, capacity, price) VALUES
(
  'مسابقه برنامه‌نویسی ۱۴۰۳',
  'بزرگترین رویداد برنامه‌نویسی سال با جوایز ارزنده',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070',
  '2024-06-15 09:00:00+00',
  'سنندج، سالن همایش‌های دانشگاه',
  100,
  500000
),
(
  'کارگاه React.js پیشرفته',
  'آموزش تکنیک‌های پیشرفته و بهینه‌سازی در React.js',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070',
  '2024-07-01 14:00:00+00',
  'آموزشگاه ما، سالن کنفرانس',
  30,
  1500000
),
(
  'همایش هوش مصنوعی',
  'بررسی آخرین دستاوردهای هوش مصنوعی در برنامه‌نویسی',
  'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2074',
  '2024-08-10 10:00:00+00',
  'هتل شادی، سالن اصلی',
  200,
  null
),
(
  'دورهمی برنامه‌نویسان کردستان',
  'نشست هم‌اندیشی و تبادل تجربیات برنامه‌نویسان',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071',
  '2024-09-20 16:00:00+00',
  'پارک علم و فناوری کردستان',
  150,
  null
);