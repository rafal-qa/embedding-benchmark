pub const READ: u8 = 0b0001;
pub const WRITE: u8 = 0b0010;
pub const SHARE: u8 = 0b0100;
pub const ADMIN: u8 = 0b1000;

pub struct Grant {
    bits: u8,
}

impl Grant {
    pub fn empty() -> Self {
        Grant { bits: 0 }
    }

    pub fn allow(&mut self, flag: u8) {
        self.bits |= flag;
    }

    pub fn deny(&mut self, flag: u8) {
        self.bits &= !flag;
    }

    pub fn permits(&self, flag: u8) -> bool {
        self.bits & flag == flag
    }

    pub fn permits_all(&self, flags: &[u8]) -> bool {
        for flag in flags {
            if !self.permits(*flag) {
                return false;
            }
        }

        true
    }

    pub fn raw(&self) -> u8 {
        self.bits
    }
}
