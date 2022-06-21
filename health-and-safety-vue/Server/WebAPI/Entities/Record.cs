using System.Collections.Generic;

namespace WebAPI.Entities
{
    public class Record
    {
        public int Id { get; set; }
        public List<RecordData> RecordData { get; set; }
    }
}