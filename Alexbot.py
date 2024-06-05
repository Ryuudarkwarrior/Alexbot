import re
import random

def get_response(user_input):
    split_message = re.split(r'\s|[,:;.?!-_]\s*', user_input.lower())
    response = check_all_messages(split_message)
    return response

def message_probability(user_message, recognized_words, single_response=False, required_word=[]):
    message_certainty = 0
    has_required_words = True

    for word in user_message:
        if word in recognized_words:
            message_certainty +=1

    percentage = float(message_certainty) / float (len(recognized_words))

    for word in required_word:
        if word not in user_message:
            has_required_words = False
            break
    if has_required_words or single_response:
        return int(percentage * 100)
    else:
        return 0

def check_all_messages(message):
        highest_prob = {}

        def response(bot_response, list_of_words, single_response = False, required_words = []):
            nonlocal highest_prob
            highest_prob[bot_response] = message_probability(message, list_of_words, single_response, required_words)

        response('Que quieres ahora pesado', ['hola'], single_response = True)
        response('La de infojobs te la sabes?', ['mira', 'que', 'meme'], required_words=['meme'])
        response('Macho es que deberias hacerte informatico tronco', ['Mira' 'lo' 'que' 'he' 'hecho', 'He' 'vuelto' 'a' 'programar', 'Volví' 'a' 'python'], single_response=True)
        response('Eres un puto notas macho', ['que' 'opinas' 'de' 'mi'], single_response=True)
        response('La culpa es del capitalismo', ['Que' 'opinas' 'de' 'la' 'situación' 'geopolitica' 'actual'], required_words=['geopolitica'])
    


        best_match = max(highest_prob, key=highest_prob.get)
        #print(highest_prob)

        return unknown() if highest_prob[best_match] < 1 else best_match

def unknown():
    response = random.choice(['Eres un puto personaje macho', '....', 'Delante de mi ensalada, ¿en serio?', 'Gendo did nothing wrong', 'Malditos Alemanes', 'Pipo'])
    return response

while True:
    print("Alexbot: " + get_response(input('You: ')))