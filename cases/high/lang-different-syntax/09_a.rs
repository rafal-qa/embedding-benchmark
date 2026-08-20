pub fn sliding_max(items: &[i32], window: usize) -> Vec<i32> {
    let mut result: Vec<i32> = Vec::new();
    let mut indices: VecDeque<usize> = VecDeque::new();

    for index in 0..items.len() {
        while let Some(&front) = indices.front() {
            if front + window <= index {
                indices.pop_front();
            } else {
                break;
            }
        }

        while let Some(&back) = indices.back() {
            if items[back] <= items[index] {
                indices.pop_back();
            } else {
                break;
            }
        }

        indices.push_back(index);

        if index + 1 >= window {
            result.push(items[indices[0]]);
        }
    }

    result
}
