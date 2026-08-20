pub fn moving_average(samples: &[f64], span: usize) -> Vec<f64> {
    if span == 0 || samples.len() < span {
        return Vec::new();
    }

    let mut output = Vec::new();
    let mut running: f64 = samples[..span].iter().sum();

    output.push(running / span as f64);

    for index in span..samples.len() {
        running += samples[index];
        running -= samples[index - span];

        output.push(running / span as f64);
    }

    output
}

pub fn latest(samples: &[f64], span: usize) -> Option<f64> {
    moving_average(samples, span).last().copied()
}

pub fn smoothest(samples: &[f64], spans: &[usize]) -> usize {
    let mut chosen = 0;
    let mut narrowest = f64::MAX;

    for span in spans {
        let series = moving_average(samples, *span);

        if series.is_empty() {
            continue;
        }

        let high = series.iter().cloned().fold(f64::MIN, f64::max);
        let low = series.iter().cloned().fold(f64::MAX, f64::min);

        if high - low < narrowest {
            narrowest = high - low;
            chosen = *span;
        }
    }

    chosen
}
