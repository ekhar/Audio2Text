import openai

#api_key = 

def transcribe(audio_file):
    with open(audio_file, "rb") as audio_file:
        transcript = openai.Audio.transcribe(
            file = audio_file,
            model = "whisper-1",
            response_format="text",
            language="en",
            api_key=api_key
        )
    return transcript

def generate(key_words, audio_file):
    result = transcribe(audio_file)
    print("RUNNING 1")
    # Your custom prompt
    custom_prompt = f"Parse through and only show me all the relevant parts about the following key words - {key_words} - in the following text. I want word for word the same text that the following text has - just about the specific key words:\n"

    # Combine the custom prompt and the text
    combined_text = custom_prompt + result

    # Send the combined text as the input to the GPT-3.5 model
    response = openai.Completion.create(
        engine="text-davinci-003",  # Choose the appropriate engine
        prompt=combined_text,
        max_tokens=500,  # Adjust this based on your desired response length
        api_key=api_key
    )

    print("RUNNING 2")

    # Extract and print the generated text from the response
    generated_text = response.choices[0].text.strip()
    return generated_text




