
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace Backend.Domain.Constants
{
    public enum EStatusResponse
    {
        [EnumMember(Value = "SUCCESS")]
        SUCCESS,
        [EnumMember(Value = "ERROR")]
        ERROR
    }

    public class EnumStringConverter<T> : JsonConverter<T> where T : Enum
    {
        public override T Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType != JsonTokenType.String)
            {
                throw new JsonException($"Expected string for {typeToConvert.Name} enum.");
            }

            string enumString = reader.GetString();
            foreach (T value in Enum.GetValues(typeToConvert))
            {
                if (EnumMemberAttribute(value) == enumString)
                {
                    return value;
                }
            }

            throw new JsonException($"Unknown string value '{enumString}' for enum {typeToConvert.Name}.");
        }

        public override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(EnumMemberAttribute(value));
        }

        private string EnumMemberAttribute(T value)
        {
            var enumType = typeof(T);
            var memberInfo = enumType.GetMember(value.ToString());
            var enumMemberAttribute = (EnumMemberAttribute)Attribute.GetCustomAttribute(memberInfo[0], typeof(EnumMemberAttribute));
            return enumMemberAttribute.Value;
        }
    }
}
