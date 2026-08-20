public sealed class Evaluator
{
    private static readonly Dictionary<string, int> Precedence = new()
    {
        ["+"] = 1,
        ["-"] = 1,
        ["*"] = 2,
        ["/"] = 2,
        ["%"] = 2,
    };

    private readonly Dictionary<string, double> variables = new();

    public void Define(string name, double value)
    {
        variables[name] = value;
    }

    public double Evaluate(string expression)
    {
        List<string> tokens = Tokenize(expression);
        List<string> output = ToPostfix(tokens);

        return Reduce(output);
    }

    public List<string> Tokenize(string expression)
    {
        List<string> tokens = new List<string>();
        int position = 0;

        while (position < expression.Length)
        {
            char symbol = expression[position];

            if (char.IsWhiteSpace(symbol))
            {
                position++;
                continue;
            }

            if (char.IsDigit(symbol) || symbol == '.')
            {
                int start = position;

                while (position < expression.Length && (char.IsDigit(expression[position]) || expression[position] == '.'))
                {
                    position++;
                }

                tokens.Add(expression[start..position]);
                continue;
            }

            if (char.IsLetter(symbol))
            {
                int start = position;

                while (position < expression.Length && char.IsLetterOrDigit(expression[position]))
                {
                    position++;
                }

                tokens.Add(expression[start..position]);
                continue;
            }

            tokens.Add(symbol.ToString());
            position++;
        }

        return tokens;
    }

    private List<string> ToPostfix(List<string> tokens)
    {
        List<string> output = new List<string>();
        Stack<string> operators = new Stack<string>();

        foreach (string token in tokens)
        {
            if (Precedence.ContainsKey(token))
            {
                while (operators.Count > 0 && Precedence.TryGetValue(operators.Peek(), out int held) && held >= Precedence[token])
                {
                    output.Add(operators.Pop());
                }

                operators.Push(token);
            }
            else if (token == "(")
            {
                operators.Push(token);
            }
            else if (token == ")")
            {
                while (operators.Count > 0 && operators.Peek() != "(")
                {
                    output.Add(operators.Pop());
                }

                if (operators.Count > 0)
                {
                    operators.Pop();
                }
            }
            else
            {
                output.Add(token);
            }
        }

        while (operators.Count > 0)
        {
            output.Add(operators.Pop());
        }

        return output;
    }

    private double Reduce(List<string> postfix)
    {
        Stack<double> values = new Stack<double>();

        foreach (string token in postfix)
        {
            if (Precedence.ContainsKey(token))
            {
                double right = values.Count > 0 ? values.Pop() : 0;
                double left = values.Count > 0 ? values.Pop() : 0;

                values.Push(Apply(token, left, right));
            }
            else
            {
                values.Push(Resolve(token));
            }
        }

        return values.Count > 0 ? values.Pop() : 0;
    }

    private double Apply(string op, double left, double right)
    {
        return op switch
        {
            "+" => left + right,
            "-" => left - right,
            "*" => left * right,
            "/" => right == 0 ? 0 : left / right,
            "%" => right == 0 ? 0 : left % right,
            _ => 0,
        };
    }

    private double Resolve(string token)
    {
        if (double.TryParse(token, out double number))
        {
            return number;
        }

        return variables.TryGetValue(token, out double held) ? held : 0;
    }
}
