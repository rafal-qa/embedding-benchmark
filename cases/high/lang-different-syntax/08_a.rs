pub fn quicksort(items: &mut Vec<i32>) {
    let end = items.len();
    sort_range(items, 0, end);
}

fn sort_range(items: &mut Vec<i32>, low: usize, high: usize) {
    if high - low < 2 {
        return;
    }

    let split = partition(items, low, high);
    sort_range(items, low, split);
    sort_range(items, split + 1, high);
}

fn partition(items: &mut Vec<i32>, low: usize, high: usize) -> usize {
    let pivot = items[high - 1];
    let mut boundary = low;

    for index in low..high - 1 {
        if items[index] <= pivot {
            items.swap(index, boundary);
            boundary += 1;
        }
    }

    items.swap(boundary, high - 1);
    boundary
}
