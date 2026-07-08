import asyncio, edge_tts, os
async def test():
    path = r'I:\新概念英语练习王\src\assets\audio\lessons\_test_narrator.mp3'
    c = edge_tts.Communicate('Mrs. Smith is in the kitchen. She is near the window.', 'en-US-ChristopherNeural')
    await c.save(path)
    print(f'Size: {os.path.getsize(path)/1024:.0f}KB')
asyncio.run(test())
