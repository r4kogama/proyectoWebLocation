import { Injectable } from '@angular/core';
import { timer, Observable, map } from 'rxjs';
import { NgParticlesService } from '@tsparticles/angular';
import { loadConfettiPreset } from '@tsparticles/preset-confetti';
import { loadEmojiShape } from '@tsparticles/shape-emoji';

@Injectable({
  providedIn: 'root'
})
export class ParticulesConfigService {
  private initialized: boolean = false;

  constructor(private readonly _ngParticlesService: NgParticlesService) {}

  // Método de inicialización llamar antes de usar partículas
  async initEngine(): Promise<void> {
    if (this.initialized) return;
    await this._ngParticlesService.init(async (engine) => {
      await loadConfettiPreset(engine);
      await loadEmojiShape(engine);
    });
    this.initialized = true;
  }

  getInfiniteConfettiConfig() {
    return {
      emitters: {
        life: {
          duration: 0 // Duración infinita
        }
      },
      preset: "confetti"
    };
  }

  getFireworksConfettiConfig() {
    return {
      emitters: {
        life: {
          count: 0, // Explosiones infinitas
          delay: 1  // 1 segundo entre explosiones
        },
        position: {} // Posición aleatoria
      },
      preset: "confetti"
    };
  }

  getMultipleCannonConfig() {
    return {
      autoPlay: true,
      emitters: [
        {
          life: {
            duration: 1,
            count: 1
          },
          position: {
            x: 0,
            y: 100
          },
          rate: {
            quantity: 25,
            delay: 0.1
          },
          particles: {
            move: {
              direction: "none"
            },
            shape: {
              type: "emoji",
              options: {
                emoji: {
                  value: ["🗺️", "📍", "🔎", "🤩"]
                }
              }
            },
            size: {
              value: { min: 18, max: 22 }
            }
          }
        },
        {
          life: {
            duration: 1,
            count: 2
          },
          position: {
            x: 0,
            y: 100
          },
          rate: {
            quantity: 50,
            delay: 0.1
          },
          particles: {
            move: {
              direction: "none"
            },
            shape: {
              type: ["square", "circle"]
            },
            size: {
              value: { min: 6, max: 10}
            }
          }
        },
        {
          life: {
            duration: 1,
            count: 1
          },
          position: {
            x: 100,
            y: 100
          },
          rate: {
            quantity: 25,
            delay: 0.1
          },
          particles: {
            move: {
              direction: "none"
            },
            shape: {
              type: "emoji",
              options: {
                emoji: {
                  value: ["🎊", "📍", "🥳","🗺️"]
                }
              }
            },
            size: {
              value: { min: 18, max: 22 }
            }
          }
        },
        {
          life: {
            duration: 1,
            count: 2
          },
          position: {
            x: 100,
            y: 100
          },
          rate: {
            quantity: 50,
            delay: 0.1
          },
          particles: {
            move: {
              direction: "none"
            },
            shape: {
              type: ["square", "circle"]
            },
            size: {
              value: { min: 6, max: 10 }
            }
          }
        }
      ],
      particles: {
        number: {
          value: 0
        },
        color: {
          value: ["#1ad5ff", "#FF0063", "#FFEA19"]
        },
        opacity: {
          value: { min: 0, max: 1 },
          animation: {
            enable: true,
            speed: 6,
            startValue: "max",
            destroy: "min",
            delay: 1
          }
        },
        move: {
          enable: true,
          gravity: {
            enable: true,
            acceleration: 33 //  gravedad
          },
          speed: 50, //  fuerza
          outModes: {
            default: "destroy",
            top: "none"
          }
        },
        rotate: {
          value: {
            min: 0,
            max: 360
          },
          direction: "random",
          move: true,
          animation: {
            enable: true,
            speed: 20
          }
        },
        wobble: {
          distance: 70, // separacion
          enable: true,
          move: true,
          speed: {
            min: -15,
            max: 35
          }
        },
        tilt: {
          direction: "random",
          enable: true,
          move: true,
          value: {
            min: 0,
            max: 360
          },
          animation: {
            enable: true,
            speed: 20
          }
        },
        roll: {
          darken: {
            enable: true,
            value: 30
          },
          enlighten: {
            enable: true,
            value: 30
          },
          enable: true,
          mode: "both",
          speed: {
            min: 10,
            max: 20
          }
        }
      }
    };
  }

  public activateDelay$(time: number): Observable<boolean>{
    return timer(time).pipe(
      map(() => true));
  }

}
