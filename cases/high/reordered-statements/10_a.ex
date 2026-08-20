@meters_per_mile 1609.344
@grams_per_ounce 28.349523125
@celsius_offset 32.0

def miles_to_meters(miles) do
  miles * @meters_per_mile
end

def meters_to_miles(meters) do
  meters / @meters_per_mile
end

def ounces_to_grams(ounces) do
  ounces * @grams_per_ounce
end

def fahrenheit_to_celsius(fahrenheit) do
  (fahrenheit - @celsius_offset) * 5.0 / 9.0
end

def celsius_to_fahrenheit(celsius) do
  celsius * 9.0 / 5.0 + @celsius_offset
end

def summary(miles, ounces) do
  meters = miles_to_meters(miles)
  grams = ounces_to_grams(ounces)

  %{meters: meters, grams: grams}
end
