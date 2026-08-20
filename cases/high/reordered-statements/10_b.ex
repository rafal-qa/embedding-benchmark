@celsius_offset 32.0
@meters_per_mile 1609.344
@grams_per_ounce 28.349523125

def celsius_to_fahrenheit(celsius) do
  celsius * 9.0 / 5.0 + @celsius_offset
end

def summary(miles, ounces) do
  grams = ounces_to_grams(ounces)
  meters = miles_to_meters(miles)

  %{meters: meters, grams: grams}
end

def ounces_to_grams(ounces) do
  ounces * @grams_per_ounce
end

def miles_to_meters(miles) do
  miles * @meters_per_mile
end

def fahrenheit_to_celsius(fahrenheit) do
  (fahrenheit - @celsius_offset) * 5.0 / 9.0
end

def meters_to_miles(meters) do
  meters / @meters_per_mile
end
