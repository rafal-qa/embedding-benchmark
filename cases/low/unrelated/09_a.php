final class Breadcrumbs
{
    public function build(string $path, array $titles): array
    {
        $trail = [];
        $walked = '';

        foreach (explode('/', trim($path, '/')) as $segment) {
            if ($segment === '') {
                continue;
            }

            $walked .= '/' . $segment;

            $trail[] = [
                'label' => $titles[$segment] ?? ucfirst($segment),
                'href' => $walked,
            ];
        }

        return $trail;
    }

    public function depth(string $path): int
    {
        $steps = 0;

        foreach (explode('/', trim($path, '/')) as $segment) {
            if ($segment !== '') {
                $steps++;
            }
        }

        return $steps;
    }
}
