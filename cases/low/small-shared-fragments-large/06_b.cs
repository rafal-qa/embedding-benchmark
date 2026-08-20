public record Label(string Name, int Value);
public record Vertex(string Name, double X, double Y, double Z);
public record Face(int A, int B, int C);

public sealed class Mesh
{
    private readonly List<Vertex> vertices;
    private readonly List<Face> faces;

    public static bool HasName(string value) => !string.IsNullOrWhiteSpace(value);

    public Mesh(IEnumerable<Vertex> vertices, IEnumerable<Face> faces)
    {
        this.vertices = vertices.ToList();
        this.faces = faces.ToList();
        if (this.vertices.Count == 0 || !this.vertices.All(vertex => HasName(vertex.Name)))
            throw new ArgumentException("name cannot be blank");
    }

    public double SurfaceArea()
    {
        double total = 0;
        foreach (Face face in faces)
        {
            Vertex a = vertices[face.A];
            Vertex b = vertices[face.B];
            Vertex c = vertices[face.C];
            double ux = b.X - a.X, uy = b.Y - a.Y, uz = b.Z - a.Z;
            double vx = c.X - a.X, vy = c.Y - a.Y, vz = c.Z - a.Z;
            double x = uy * vz - uz * vy;
            double y = uz * vx - ux * vz;
            double z = ux * vy - uy * vx;
            total += Math.Sqrt(x * x + y * y + z * z) / 2;
        }
        return total;
    }

    public List<Label> Summary() => OrderLabels(faces
        .Select((face, index) => new Label($"face-{index}", face.A + face.B + face.C)));

    public List<string> Names() => vertices.Select(vertex => vertex.Name).Distinct().Order().ToList();

    public (Vertex Minimum, Vertex Maximum) Bounds()
    {
        Vertex minimum = new("minimum", vertices.Min(v => v.X), vertices.Min(v => v.Y), vertices.Min(v => v.Z));
        Vertex maximum = new("maximum", vertices.Max(v => v.X), vertices.Max(v => v.Y), vertices.Max(v => v.Z));
        return (minimum, maximum);
    }

    public Dictionary<int, HashSet<int>> Adjacency()
    {
        Dictionary<int, HashSet<int>> result = new();
        foreach (Face face in faces)
        {
            Connect(result, face.A, face.B);
            Connect(result, face.B, face.C);
            Connect(result, face.C, face.A);
        }
        return result;
    }

    private static List<Label> OrderLabels(IEnumerable<Label> labels)
    {
        return labels.OrderBy(label => label.Name).ToList();
    }

    private static void Connect(Dictionary<int, HashSet<int>> graph, int left, int right)
    {
        if (!graph.TryGetValue(left, out HashSet<int>? neighbors)) graph[left] = neighbors = new();
        neighbors.Add(right);
    }
}
