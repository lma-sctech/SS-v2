$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$pngCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/png" }

function New-DirectoryForFile {
  param([string]$Path)
  $directory = Split-Path -Parent $Path
  New-Item -ItemType Directory -Force -Path $directory | Out-Null
}

function Save-ResizedImage {
  param(
    [string]$Source,
    [string]$Destination,
    [int]$MaxWidth,
    [long]$Quality = 68,
    [string]$Format = "jpeg"
  )

  $sourcePath = Join-Path $root $Source
  $destinationPath = Join-Path $root $Destination
  New-DirectoryForFile -Path $destinationPath

  $image = [System.Drawing.Image]::FromFile($sourcePath)
  try {
    $scale = [Math]::Min(1.0, [double]$MaxWidth / [double]$image.Width)
    $width = [Math]::Max(1, [int][Math]::Round($image.Width * $scale))
    $height = [Math]::Max(1, [int][Math]::Round($image.Height * $scale))

    $bitmap = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    try {
      $bitmap.SetResolution(72, 72)
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        if ($Format -eq "png") {
          $graphics.Clear([System.Drawing.Color]::Transparent)
        }
        else {
          $graphics.Clear([System.Drawing.Color]::White)
        }
        $graphics.DrawImage($image, 0, 0, $width, $height)
      }
      finally {
        $graphics.Dispose()
      }

      if ($Format -eq "png") {
        $bitmap.Save($destinationPath, $pngCodec, $null)
      }
      else {
        $qualityParam = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $Quality)
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = $qualityParam
        $bitmap.Save($destinationPath, $jpegCodec, $encoderParams)
        $encoderParams.Dispose()
        $qualityParam.Dispose()
      }
    }
    finally {
      $bitmap.Dispose()
    }
  }
  finally {
    $image.Dispose()
  }
}

$jobs = @(
  @{ Source = "public/img/logo_sanaaservices_hd.png"; Destination = "public/img/optimized/logo/sanaa-logo-640.png"; MaxWidth = 640; Format = "png" },
  @{ Source = "public/img/travel_usa03.jpg"; Destination = "public/img/optimized/hero/travel-hero-poster-1600.jpg"; MaxWidth = 1600; Quality = 64 },
  @{ Source = "public/img/travel_usa03.jpg"; Destination = "public/img/optimized/hero/travel-hero-poster-900.jpg"; MaxWidth = 900; Quality = 62 },
  @{ Source = "public/img/Notary1.jpg"; Destination = "public/img/optimized/services/notary-1200.jpg"; MaxWidth = 1200; Quality = 64 },
  @{ Source = "public/img/legal_consultancy2.jpg"; Destination = "public/img/optimized/services/legal-consultancy-1200.jpg"; MaxWidth = 1200; Quality = 64 },
  @{ Source = "public/img/family_insurance2.jpg"; Destination = "public/img/optimized/services/insurance-1200.jpg"; MaxWidth = 1200; Quality = 64 },
  @{ Source = "public/img/american-passport.jpg"; Destination = "public/img/optimized/services/translation-1000.jpg"; MaxWidth = 1000; Quality = 64 },
  @{ Source = "public/img/drive_lesson.jpg"; Destination = "public/img/optimized/services/driving-school-1200.jpg"; MaxWidth = 1200; Quality = 64 },
  @{ Source = "public/img/welcom_usa.jpg"; Destination = "public/img/optimized/services/visa-immigration-1200.jpg"; MaxWidth = 1000; Quality = 58 },
  @{ Source = "public/img/Travel01.jpg"; Destination = "public/img/optimized/services/travel-1200.jpg"; MaxWidth = 1200; Quality = 64 },
  @{ Source = "public/img/apointment.jpg"; Destination = "public/img/optimized/cards/appointment-900.jpg"; MaxWidth = 900; Quality = 64 },
  @{ Source = "public/img/document_private.jpg"; Destination = "public/img/optimized/cards/document-private-900.jpg"; MaxWidth = 900; Quality = 64 },
  @{ Source = "public/img/where_to_start2.jpg"; Destination = "public/img/optimized/cards/where-to-start-900.jpg"; MaxWidth = 900; Quality = 62 },
  @{ Source = "public/img/legal_consultancy2.jpg"; Destination = "public/img/optimized/cta/legal-consultancy-1400.jpg"; MaxWidth = 1400; Quality = 62 }
)

foreach ($job in $jobs) {
  Save-ResizedImage @job
}

Get-ChildItem -Path (Join-Path $root "public/img/optimized") -Recurse -File |
  Sort-Object Length -Descending |
  Select-Object FullName, @{Name="KB";Expression={[Math]::Round($_.Length / 1KB, 1)}}
