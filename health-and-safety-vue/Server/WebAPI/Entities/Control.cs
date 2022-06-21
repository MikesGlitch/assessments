namespace WebAPI.Entities
{
    public class Control
    {
        public int Id { get; set; }
        public string Label { get; set; }
        public string Type { get; set; }
        public bool Required { get; set; }
        public string DataUrl { get; set; }
    }
}