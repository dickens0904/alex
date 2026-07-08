param(
    [string]$ImagePath = "C:\Users\dicke\AppData\Local\Temp\codex-shot-2026-06-29_06-47-58.png"
)

Add-Type -AssemblyName System.Drawing

$bitmap = [System.Drawing.Bitmap]::new($ImagePath)
Write-Host "Image size: $($bitmap.Width) x $($bitmap.Height)"

# Use Windows.Media.Ocr (WinRT API)
Add-Type -TypeDefinition @"
using System;
using System.Threading.Tasks;
using Windows.Graphics.Imaging;
using Windows.Media.Ocr;
using System.IO;
using System.Runtime.InteropServices.WindowsRuntime;

public class OcrHelper {
    public static async Task<string> ExtractText(string imagePath) {
        var file = await StorageFile.GetFileFromPathAsync(imagePath);
        var stream = await file.OpenAsync(FileAccessMode.Read);
        var decoder = await BitmapDecoder.CreateAsync(stream);
        var bitmap = await decoder.GetSoftwareBitmapAsync(BitmapPixelFormat.Bgra8, BitmapAlphaMode.Premultiplied);
        var engine = OcrEngine.TryCreateFromLanguage(new Windows.Globalization.Language("zh-CN"));
        if (engine == null) {
            engine = OcrEngine.TryCreateFromLanguage(new Windows.Globalization.Language("en-US"));
        }
        if (engine == null) {
            engine = OcrEngine.TryCreateFromUserProfileLanguages();
        }
        var result = await engine.RecognizeAsync(bitmap);
        return result.Text;
    }
}
"@ -ReferencedAssemblies "Windows", "System.Runtime.WindowsRuntime"

# Alternative: use simple PowerShell approach with Windows OCR
Add-Type -AssemblyName System.Runtime.WindowsRuntime

$null = [Windows.Media.Ocr.OcrEngine, Windows.Media.Ocr, ContentType=WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType=WindowsRuntime]

# Load the image
$stream = [System.IO.File]::OpenRead($ImagePath)
$randomAccessStream = [Windows.Storage.Streams.IRandomAccessStream].Assembly.GetType("System.IO.WindowsRuntimeStreamExtensions")
$netStream = $randomAccessStream.GetMethod("AsRandomAccessStream").Invoke($null, @($stream))

$task = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($netStream)
$decoder = $task.AsTask().Result

$task2 = $decoder.GetSoftwareBitmapAsync([Windows.Graphics.Imaging.BitmapPixelFormat]::Bgra8, [Windows.Graphics.Imaging.BitmapAlphaMode]::Premultiplied)
$bitmap = $task2.AsTask().Result

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage([Windows.Globalization.Language]::new("en-US"))
if (-not $engine) {
    $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
}

$task3 = $engine.RecognizeAsync($bitmap)
$result = $task3.AsTask().Result

Write-Host "=== OCR Result ==="
Write-Host $result.Text

$stream.Dispose()
$netStream.Dispose()
