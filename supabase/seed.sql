-- Local development seed. Runs after migrations on `supabase db reset`.

-- Taxonomy -------------------------------------------------------------------
insert into public.categories (slug, name, icon, color, position, description) values
  ('frontend', 'Frontend', 'layout', '#38bdf8', 1, 'Giao diện, trình duyệt và mọi thứ người dùng nhìn thấy.'),
  ('backend', 'Backend', 'server', '#818cf8', 2, 'API, kiến trúc server và xử lý dữ liệu.'),
  ('mobile', 'Mobile', 'smartphone', '#f472b6', 3, 'Ứng dụng iOS, Android và đa nền tảng.'),
  ('devops', 'DevOps', 'container', '#34d399', 4, 'CI/CD, container, hạ tầng và vận hành.'),
  ('database', 'Database', 'database', '#fbbf24', 5, 'SQL, NoSQL, tối ưu truy vấn và mô hình dữ liệu.'),
  ('ai', 'AI', 'sparkles', '#a78bfa', 6, 'LLM, agent và ứng dụng AI vào sản phẩm.'),
  ('security', 'Security', 'shield', '#f87171', 7, 'Bảo mật ứng dụng và hạ tầng.'),
  ('career', 'Career', 'briefcase', '#94a3b8', 8, 'Nghề lập trình, phỏng vấn và phát triển bản thân.');

insert into public.categories (parent_id, slug, name, position)
select c.id, v.slug, v.name, v.position
from (values
  ('frontend', 'react', 'React', 1),
  ('frontend', 'vue', 'Vue', 2),
  ('frontend', 'nextjs', 'Next.js', 3),
  ('frontend', 'css', 'CSS', 4),
  ('backend', 'laravel', 'Laravel', 1),
  ('backend', 'nodejs', 'Node.js', 2),
  ('backend', 'go', 'Go', 3),
  ('devops', 'docker', 'Docker', 1),
  ('devops', 'ci-cd', 'CI/CD', 2),
  ('database', 'postgresql', 'PostgreSQL', 1),
  ('database', 'redis', 'Redis', 2),
  ('ai', 'llm', 'LLM', 1),
  ('ai', 'agents', 'Agents', 2)
) as v(parent_slug, slug, name, position)
join public.categories c on c.slug = v.parent_slug;

insert into public.tags (slug, name, status) values
  ('nextjs', 'nextjs', 'approved'),
  ('react', 'react', 'approved'),
  ('laravel', 'laravel', 'approved'),
  ('tailwind', 'tailwind', 'approved'),
  ('typescript', 'typescript', 'approved'),
  ('postgres', 'postgres', 'approved'),
  ('supabase', 'supabase', 'approved'),
  ('queue', 'queue', 'approved'),
  ('rls', 'rls', 'approved'),
  ('docker', 'docker', 'approved');

insert into public.series (slug, title, description) values
  ('laravel-tu-a-z', 'Laravel từ A-Z', 'Xây một ứng dụng Laravel hoàn chỉnh, từ routing tới queue và deploy.');

-- Demo users (local only) ----------------------------------------------------
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'hainam@example.com', '{"user_name":"hainam","full_name":"Nguyễn Hải Nam"}', now(), now()),
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'minhanh@example.com', '{"user_name":"minhanh","full_name":"Trần Minh Anh"}', now(), now());

update public.profiles set role = 'editor', specialty = 'Backend · Laravel',
  bio = 'Backend engineer, thích queue, cache và những hệ thống chạy êm lúc 3 giờ sáng.'
where username = 'hainam';
update public.profiles set role = 'author', specialty = 'Frontend · React',
  bio = 'Frontend developer, mê design system và animation vừa đủ.'
where username = 'minhanh';

-- Demo posts -----------------------------------------------------------------
insert into public.posts (slug, title, excerpt, content_md, status, level, category_id, series_id, series_position, reading_minutes, created_by, published_at)
select v.slug, v.title, v.excerpt, v.content_md, 'published', v.level::public.post_level,
  (select id from public.categories where slug = v.category),
  (select id from public.series where slug = v.series),
  v.series_position, v.reading_minutes,
  (select id from public.profiles where username = v.author),
  now() - (v.days_ago || ' days')::interval
from (values
  ('queue-trong-laravel', 'Queue trong Laravel: xử lý việc nặng mà không bắt người dùng chờ',
   'Gửi email, resize ảnh, gọi API chậm… tất cả nên chạy nền. Bài này đi từ job đầu tiên tới retry và failed jobs.',
   E'## Vì sao cần queue\n\nMột request HTTP nên trả về trong vài trăm mili giây. Mọi việc lâu hơn thế nên được **đẩy vào hàng đợi**.\n\n## Tạo job đầu tiên\n\n```php\n// app/Jobs/SendWelcomeEmail.php\nclass SendWelcomeEmail implements ShouldQueue\n{\n    public function __construct(public User $user) {}\n\n    public function handle(): void\n    {\n        Mail::to($this->user)->send(new WelcomeMail($this->user));\n    }\n}\n```\n\n> Mẹo: luôn truyền model thay vì mảng dữ liệu, Laravel sẽ serialize ID và tải lại model khi job chạy.\n\n## Retry và failed jobs\n\nĐặt `$tries` và `$backoff` để job tự thử lại khi dịch vụ ngoài lỗi tạm thời.\n',
   'intermediate', 'laravel', 'laravel-tu-a-z', 3, 8, 'hainam', 2),
  ('rls-supabase-cho-nguoi-moi', 'Row Level Security trong Supabase cho người mới bắt đầu',
   'RLS biến Postgres thành lớp phân quyền cuối cùng. Hiểu policy, auth.uid() và các lỗi hay gặp.',
   E'## RLS là gì\n\nRow Level Security cho phép viết luật truy cập **cho từng dòng** dữ liệu ngay trong Postgres.\n\n```sql\ncreate policy "chỉ sửa bình luận của mình" on comments\n  for update using (author_id = auth.uid());\n```\n\n## Lỗi hay gặp\n\n- Quên `enable row level security` khiến bảng mở toang.\n- Viết policy gọi lại chính bảng đó gây đệ quy.\n',
   'beginner', 'postgresql', null, null, 6, 'hainam', 5),
  ('server-components-thuc-chien', 'Server Components thực chiến: khi nào cần "use client"?',
   'Mặc định là server, chỉ xuống client khi thật sự cần tương tác. Vài quy tắc đơn giản để không lạc lối.',
   E'## Mặc định là server\n\nTrong App Router, mọi component là **Server Component** cho tới khi bạn viết `"use client"`.\n\n## Khi nào cần client\n\n- Có state hoặc effect\n- Lắng nghe sự kiện như `onClick`\n- Dùng API của trình duyệt\n\n```tsx\n"use client"\n\nexport function LikeButton() {\n  const [liked, setLiked] = useState(false)\n  return <button onClick={() => setLiked(!liked)}>{liked ? "Đã thích" : "Thích"}</button>\n}\n```\n',
   'intermediate', 'nextjs', null, null, 7, 'minhanh', 1)
) as v(slug, title, excerpt, content_md, level, category, series, series_position, reading_minutes, author, days_ago);

insert into public.post_tags (post_id, tag_id)
select p.id, t.id
from (values
  ('queue-trong-laravel', 'laravel'),
  ('queue-trong-laravel', 'queue'),
  ('rls-supabase-cho-nguoi-moi', 'supabase'),
  ('rls-supabase-cho-nguoi-moi', 'rls'),
  ('rls-supabase-cho-nguoi-moi', 'postgres'),
  ('server-components-thuc-chien', 'nextjs'),
  ('server-components-thuc-chien', 'react')
) as v(post_slug, tag_slug)
join public.posts p on p.slug = v.post_slug
join public.tags t on t.slug = v.tag_slug;
