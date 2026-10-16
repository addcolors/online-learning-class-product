insert into public.education_stages (name, slug, sort_order) values
('Nursery', 'nursery', 10), ('Primary', 'primary', 20), ('Secondary', 'secondary', 30),
('Undergraduate', 'undergraduate', 40), ('Postgraduate', 'postgraduate', 50), ('Professional', 'professional', 60);

insert into public.countries (name, slug, iso_code, summary, publication_status, reviewed_at) values
('Germany', 'germany', 'DE', 'Representative destination coverage for public and applied-science routes.', 'published', now()),
('United Kingdom', 'united-kingdom', 'GB', 'Representative one-year postgraduate and undergraduate routes.', 'published', now()),
('Netherlands', 'netherlands', 'NL', 'Representative research and applied education routes.', 'published', now()),
('Canada', 'canada', 'CA', 'Representative school, college and university pathways.', 'published', now());

insert into public.institutions (country_id, name, slug, institution_type, city, summary, official_url, publication_status, last_reviewed_at)
select id, 'Northbridge University', 'northbridge-university', 'Public research university', 'Manchester', 'Demonstration institution record for product evaluation.', 'https://example.edu/northbridge', 'published', now() from public.countries where slug = 'united-kingdom';
insert into public.institutions (country_id, name, slug, institution_type, city, summary, official_url, publication_status, last_reviewed_at)
select id, 'Rheinland Institute of Technology', 'rheinland-institute-of-technology', 'Public technical university', 'Cologne', 'Demonstration institution record for product evaluation.', 'https://example.edu/rheinland', 'published', now() from public.countries where slug = 'germany';
insert into public.institutions (country_id, name, slug, institution_type, city, summary, official_url, publication_status, last_reviewed_at)
select id, 'Amstel School of Applied Sciences', 'amstel-school-of-applied-sciences', 'University of applied sciences', 'Amsterdam', 'Demonstration institution record for product evaluation.', 'https://example.edu/amstel', 'published', now() from public.countries where slug = 'netherlands';
insert into public.institutions (country_id, name, slug, institution_type, city, summary, official_url, publication_status, last_reviewed_at)
select id, 'Cedar Grove International School', 'cedar-grove-international-school', 'Independent international school', 'Toronto', 'Demonstration school record for product evaluation.', 'https://example.edu/cedar-grove', 'published', now() from public.countries where slug = 'canada';

insert into public.programs (institution_id, title, slug, subject, summary, delivery_mode, duration_months, teaching_language, publication_status, last_reviewed_at)
select id, 'MSc Artificial Intelligence', 'msc-artificial-intelligence-northbridge', 'Artificial Intelligence', 'Demonstration project-led AI master’s route.', 'On campus', 12, 'English', 'published', now() from public.institutions where slug = 'northbridge-university';
insert into public.programs (institution_id, title, slug, subject, summary, delivery_mode, duration_months, teaching_language, publication_status, last_reviewed_at)
select id, 'MSc Data Science & Society', 'msc-data-science-rheinland', 'Data Science', 'Demonstration interdisciplinary data science route.', 'On campus', 24, 'English', 'published', now() from public.institutions where slug = 'rheinland-institute-of-technology';
insert into public.programs (institution_id, title, slug, subject, summary, delivery_mode, duration_months, teaching_language, publication_status, last_reviewed_at)
select id, 'BSc Digital Product Design', 'bsc-digital-product-design-amstel', 'Design', 'Demonstration applied digital design route.', 'On campus', 48, 'English', 'published', now() from public.institutions where slug = 'amstel-school-of-applied-sciences';

insert into public.sources (institution_id, title, source_url, source_owner, licensing_notes, last_checked_at)
select id, 'Demonstration admissions source', 'https://example.edu/northbridge/admissions', 'Northbridge University', 'Synthetic demonstration URL; replace before production.', now() from public.institutions where slug = 'northbridge-university';

insert into public.coverage_records (country_id, coverage_level, reviewed_at, notes)
select id, 'representative', now(), 'Demonstration coverage only; not exhaustive.' from public.countries;
