# 📘 Redis + Laravel Setup Reference (Predis & PHPRedis)

## 🔧 1. Installing & Running Redis

### ✅ On Ubuntu:

```bash
sudo apt update
sudo apt install redis-server
```

To run Redis and enable auto-start:

```bash
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

Check if Redis is running:

```bash
redis-cli ping
# → PONG
```

### ✅ On macOS (using Homebrew):

```bash
brew install redis
brew services start redis
```

To test Redis:

```bash
redis-cli ping
# → PONG
```

### ✅ On Windows:

Redis is not officially supported on Windows.

Download the Microsoft port of Redis 3.0 from:  
https://github.com/microsoftarchive/redis/releases

Extract and run:

```bash
redis-server.exe
```

To stop:

```bash
Ctrl + C
```

---

## 🌐 2. Enable Predis in Laravel

### ✅ Install Predis:

```bash
composer require predis/predis
```

### ✅ Update `.env`:

```env
REDIS_CLIENT=predis
```

### ✅ Laravel `config/database.php`:

```php
'redis' => [
    'client' => env('REDIS_CLIENT', 'predis'),

    'options' => [
        'cluster' => env('REDIS_CLUSTER', 'redis'),
        'prefix' => env('REDIS_PREFIX', ''), // Important!
    ],

    'default' => [
        'host' => env('REDIS_HOST', '127.0.0.1'),
        'password' => env('REDIS_PASSWORD', null),
        'port' => env('REDIS_PORT', 6379),
        'database' => env('REDIS_DB', 0),
    ],

    'cache' => [
        'host' => env('REDIS_HOST', '127.0.0.1'),
        'password' => env('REDIS_PASSWORD', null),
        'port' => env('REDIS_PORT', 6379),
        'database' => env('REDIS_CACHE_DB', 1),
    ],
],
```

---

## 🚨 3. Redis Key Prefixing Issues in Laravel

Laravel adds a prefix automatically if you leave the default:

```php
'prefix' => env('REDIS_PREFIX', Str::slug(env('APP_NAME', 'laravel'), '_').'_database_'),
```

So a key like:

```php
Redis::set('admin:products:xyz', $value);
```

Gets stored as:

```
ecommerce_app_database_admin:products:xyz
```

### ❗ Problem:

You won't be able to fetch it with:

```php
Redis::get('admin:products:xyz');
```

### ✅ Solution: Disable prefix

If you're managing Redis keys yourself:

```php
'prefix' => '',
```

Now your code will work as expected:

```php
Redis::set('admin:products:xyz', $value);
Redis::get('admin:products:xyz'); // ✅ Works now
```

---

## 🧪 4. Test Redis Connection in Laravel

```php
Route::get('/redis-test', function () {
    Redis::set('test_key', 'Hello Redis!');
    $value = Redis::get('test_key');

    return response()->json([
        'message' => 'Redis is working!',
        'value' => $value,
    ]);
});
```

---

## 🛑 5. Fix: "MISCONF Redis is configured to save RDB snapshots..."

This error means Redis failed to write to disk (e.g. permission issue or disk full).

### To fix:

Stop Redis:

```bash
redis-cli shutdown
```

Start with persistence disabled:

```bash
redis-server --save "" --appendonly no
```

Or check logs and run:

```bash
sudo chown redis:redis /var/lib/redis
sudo chmod 770 /var/lib/redis
sudo systemctl restart redis-server
```

---

## 🔁 6. Clear Redis Cache Keys Manually

If you use patterns like:

```php
Redis::keys('admin:products:*');
```

Then clear like this:

```php
foreach (Redis::keys('admin:products:*') as $key) {
    Redis::del($key);
}
```
