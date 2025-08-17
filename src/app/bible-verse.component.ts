import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Verse {
  number: number;
  text: string;
}

@Component({
  selector: 'app-bible-verse',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="header">
        <h1>பைபிள் வசனங்கள்</h1>
        <p class="chapter-title">{{ chapterTitle }}</p>
      </div>

      <div class="verses-container" [class.fullscreen]="isFullscreen()">
        <div 
          *ngFor="let verse of verses" 
          class="verse"
          [class.highlighted]="selectedVerse() === verse.number"
        >
          <span 
            class="verse-number" 
            (click)="toggleFullscreen(verse.number)"
            [title]="'வசனம் ' + verse.number + ' ஐ முழுத்திரையில் காண கிளிக் செய்யவும்'"
          >
            {{ verse.number }}
          </span>
          <span class="verse-text">{{ verse.text }}</span>
        </div>
      </div>

      <div *ngIf="isFullscreen()" class="fullscreen-overlay" (click)="closeFullscreen()">
        <div class="fullscreen-content" (click)="$event.stopPropagation()">
          <button class="close-btn" (click)="closeFullscreen()" title="மூடு">×</button>
          <div class="fullscreen-verse">
            <h2>வசனம் {{ selectedVerse() }}</h2>
            <p class="fullscreen-text">{{ getSelectedVerseText() }}</p>
            <p class="chapter-ref">{{ chapterTitle }}</p>
          </div>
        </div>
      </div>

      <div class="navigation">
        <button class="nav-btn" routerLink="/">முகப்பு பக்கம்</button>
        <button class="nav-btn" routerLink="/test">சோதனை பக்கம்</button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Noto Sans Tamil', Arial, sans-serif;
      line-height: 1.6;
    }

    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #e0e0e0;
    }

    .header h1 {
      color: #2c3e50;
      font-size: 2.5rem;
      margin-bottom: 10px;
      font-weight: 600;
    }

    .chapter-title {
      color: #7f8c8d;
      font-size: 1.2rem;
      margin: 0;
    }

    .verses-container {
      background: #f8f9fa;
      border-radius: 10px;
      padding: 25px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .verse {
      margin-bottom: 15px;
      padding: 10px;
      border-radius: 5px;
      transition: all 0.3s ease;
    }

    .verse:hover {
      background-color: #e8f4fd;
    }

    .verse.highlighted {
      background-color: #d4edda;
      border-left: 4px solid #28a745;
    }

    .verse-number {
      display: inline-block;
      background: #3498db;
      color: white;
      padding: 4px 8px;
      border-radius: 50%;
      font-weight: bold;
      font-size: 0.9rem;
      cursor: pointer;
      margin-right: 10px;
      min-width: 25px;
      text-align: center;
      transition: all 0.3s ease;
      user-select: none;
    }

    .verse-number:hover {
      background: #2980b9;
      transform: scale(1.1);
      box-shadow: 0 2px 8px rgba(52, 152, 219, 0.4);
    }

    .verse-text {
      font-size: 1.1rem;
      color: #2c3e50;
      line-height: 1.7;
    }

    .fullscreen-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease;
    }

    .fullscreen-content {
      background: white;
      border-radius: 15px;
      padding: 40px;
      max-width: 90vw;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      animation: slideIn 0.3s ease;
    }

    .close-btn {
      position: absolute;
      top: 15px;
      right: 20px;
      background: #e74c3c;
      color: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      font-size: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .close-btn:hover {
      background: #c0392b;
      transform: scale(1.1);
    }

    .fullscreen-verse {
      text-align: center;
      padding: 20px 0;
    }

    .fullscreen-verse h2 {
      color: #2c3e50;
      font-size: 2rem;
      margin-bottom: 20px;
      border-bottom: 2px solid #3498db;
      padding-bottom: 10px;
    }

    .fullscreen-text {
      font-size: 1.5rem;
      line-height: 1.8;
      color: #34495e;
      margin-bottom: 20px;
      padding: 0 20px;
    }

    .chapter-ref {
      color: #7f8c8d;
      font-size: 1.1rem;
      font-style: italic;
    }

    .navigation {
      margin-top: 30px;
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }

    .nav-btn {
      background: #27ae60;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 25px;
      font-size: 1rem;
      cursor: pointer;
      margin: 0 10px;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
    }

    .nav-btn:hover {
      background: #219a52;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideIn {
      from { 
        opacity: 0;
        transform: scale(0.8) translateY(-50px);
      }
      to { 
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    @media (max-width: 768px) {
      .container {
        padding: 15px;
      }
      
      .header h1 {
        font-size: 2rem;
      }
      
      .fullscreen-content {
        padding: 30px 20px;
        margin: 20px;
      }
      
      .fullscreen-text {
        font-size: 1.3rem;
        padding: 0 10px;
      }
      
      .verse-text {
        font-size: 1rem;
      }
    }
  `]
})
export class BibleVerseComponent {
  chapterTitle = 'யோவான் 3:1-21';
  isFullscreen = signal(false);
  selectedVerse = signal<number | null>(null);

  verses: Verse[] = [
    {
      number: 1,
      text: 'பரிசேயரில் நிக்கொதேமு என்னும் பேர்கொண்ட ஒரு மனிதன் இருந்தான்; அவன் யூதரின் அதிகாரியாக இருந்தான்.'
    },
    {
      number: 2,
      text: 'அவன் இரவிலே இயேசுவினிடத்தில் வந்து, அவரை நோக்கி: ரபீ, நீர் தேவனிடத்திலிருந்து வந்த போதகர் என்று அறிந்திருக்கிறோம்; தேவன் உம்மோடேகூட இராவிட்டால் நீர் செய்கிற இந்த அடையாளங்களை ஒருவனாலும் செய்யக்கூடாதே என்றான்.'
    },
    {
      number: 3,
      text: 'இயேசு அவனுக்கு மறுமொழியாக: மனிதன் மறுபடியும் பிறவாவிட்டால் தேவனுடைய ராஜ்யத்தைக் காணக்கூடாது என்று மெய்யாகவே மெய்யாகவே உனக்குச் சொல்லுகிறேன் என்றார்.'
    },
    {
      number: 4,
      text: 'நிக்கொதேமு அவரை நோக்கி: மனிதன் வயதானபின்பு எப்படிப் பிறக்கக்கூடும்? அவன் தன் தாயின் கர்ப்பத்தில் இரண்டாந்தரம் பிரவேசித்துப் பிறக்கக்கூடுமா என்றான்.'
    },
    {
      number: 5,
      text: 'இயேசு மறுமொழியாக: மனிதன் ஜலத்தினாலும் ஆவியினாலும் பிறவாவிட்டால் தேவனுடைய ராஜ்யத்தில் பிரவேசிக்கக்கூடாது என்று மெய்யாகவே மெய்யாகவே உனக்குச் சொல்லுகிறேன்.'
    },
    {
      number: 16,
      text: 'தேவன், தம்முடைய ஒரே பேறான குமாரனை விசுவாசிக்கிற எவனும் கெட்டுப்போகாமல் நித்தியஜீவனை அடையும்படிக்கு, அவரைக் கொடுத்தளவுக்கு உலகத்தின்மேல் அன்பு கூர்ந்தார்.'
    },
    {
      number: 17,
      text: 'தேவன் தம்முடைய குமாரனை உலகத்தை ஆக்கினைக்குள்ளாக்கும்படி உலகத்தில் அனுப்பாமல், உலகம் அவர் மூலமாய் இரక்షிக்கப்படும்படி அனுப்பினார்.'
    },
    {
      number: 18,
      text: 'அவரை விசுவாசிக்கிறவன் ஆக்கினைக்குள்ளாகமாட்டான்; விசுவாசியாதவனோ ஏற்கனவே ஆக்கினைக்குள்ளானான்; ஏனென்றால், தேவனுடைய ஒரே பேறான குமாரனுடைய நாமத்தின்மேல் அவன் விசுவாசியாதிருக்கிறான்.'
    }
  ];

  toggleFullscreen(verseNumber: number): void {
    if (this.isFullscreen() && this.selectedVerse() === verseNumber) {
      this.closeFullscreen();
    } else {
      this.selectedVerse.set(verseNumber);
      this.isFullscreen.set(true);
    }
  }

  closeFullscreen(): void {
    this.isFullscreen.set(false);
    this.selectedVerse.set(null);
  }

  getSelectedVerseText(): string {
    const verse = this.verses.find(v => v.number === this.selectedVerse());
    return verse ? verse.text : '';
  }
}