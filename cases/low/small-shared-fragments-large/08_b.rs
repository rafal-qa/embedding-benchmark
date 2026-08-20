#[derive(Clone, Debug, PartialEq)]
pub enum State {
    Ready,
    Blocked,
    Finished,
}

pub fn label(name: &str, value: usize) -> (String, usize) {
    (name.to_string(), value)
}

pub fn bounded(value: usize, limit: usize) -> usize {
    value.min(limit)
}

pub enum Instruction {
    Push(i64), Add, Multiply, Duplicate, JumpIfZero(usize), Halt,
}

pub struct Machine {
    code: Vec<Instruction>,
    stack: Vec<i64>,
    cursor: usize,
    state: State,
    labels: BTreeMap<String, usize>,
}

impl Machine {
    pub fn new(code: Vec<Instruction>, labels: BTreeMap<String, usize>) -> Self {
        Self { code, stack: Vec::new(), cursor: 0, state: State::Ready, labels }
    }

    pub fn run(&mut self, limit: usize) -> Result<State, String> {
        if self.labels.is_empty() {
            return Err("label cannot be empty".to_string());
        }
        let limit = bounded(limit, self.code.len().saturating_mul(100));
        let mut steps = 0;
        while self.cursor < self.code.len() && steps < limit {
            steps += 1;
            match self.code[self.cursor] {
                Instruction::Push(value) => self.stack.push(value),
                Instruction::Add => self.binary(|a, b| a + b)?,
                Instruction::Multiply => self.binary(|a, b| a * b)?,
                Instruction::Duplicate => {
                    let value = *self.stack.last().ok_or("empty stack")?;
                    self.stack.push(value);
                }
                Instruction::JumpIfZero(target) => {
                    if self.stack.pop().ok_or("empty stack")? == 0 { self.cursor = target; continue; }
                }
                Instruction::Halt => { self.state = State::Finished; return Ok(self.state.clone()); }
            }
            self.cursor += 1;
        }
        if steps == limit { self.state = State::Blocked; }
        Ok(self.state.clone())
    }

    fn binary(&mut self, operation: impl Fn(i64, i64) -> i64) -> Result<(), String> {
        let right = self.stack.pop().ok_or("empty stack")?;
        let left = self.stack.pop().ok_or("empty stack")?;
        self.stack.push(operation(left, right));
        Ok(())
    }

    pub fn label_names(&self) -> BTreeSet<String> { self.labels.keys().cloned().collect() }

    pub fn label_list(&self) -> Vec<(String, usize)> {
        self.labels.iter().map(|(name, value)| label(name, *value)).collect()
    }

    pub fn reset(&mut self) {
        self.stack.clear();
        self.cursor = 0;
        self.state = State::Ready;
    }

    pub fn jump(&mut self, label: &str) -> Result<(), String> {
        self.cursor = *self.labels.get(label).ok_or_else(|| format!("unknown label {label}"))?;
        self.state = State::Ready;
        Ok(())
    }

    pub fn stack(&self) -> &[i64] { &self.stack }

    pub fn finished(&self) -> bool { self.state == State::Finished }
}
