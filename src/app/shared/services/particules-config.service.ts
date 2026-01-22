import { Injectable } from '@angular/core';
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import { NgParticlesService } from "@tsparticles/angular";
import { loadEmojiShape } from "@tsparticles/shape-emoji";

@Injectable({
  providedIn: 'root'
})
export class ParticulesConfigService {
  id: string = "tsparticles";


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
            quantity: 20,
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
              value: { min: 12, max: 16 }
            }
          }
        },
        {
          life: {
            duration: 0.5,
            count: 4
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
              type: ["square", "circle"]
            },
            size: {
              value: { min: 2, max: 4 }
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
            quantity: 15,
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
              value: { min: 12, max: 16 }
            }
          }
        },
        {
          life: {
            duration: 0.5,
            count: 4
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
              type: ["square", "circle"]
            },
            size: {
              value: { min: 2, max: 4 }
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
            speed: 0.8,
            startValue: "max",
            destroy: "min",
            delay: 0.5 // Espera 1 segundo antes de empezar a desvanecerse
          }
        },
        move: {
          enable: true,
          gravity: {
            enable: true,
            acceleration: 40 // Menos gravedad para que suban más
          },
          speed: 45, // Más velocidad = más fuerza
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
            speed: 60
          }
        },
        wobble: {
          distance: 10,
          enable: true,
          move: true,
          speed: {
            min: -15,
            max: 15
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
            speed: 60
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
            max: 25
          }
        }
      }
    };
  }


constructor(private readonly ngParticlesService: NgParticlesService) {}

  private initParticles(): void{
      this.ngParticlesService.init(async (engine) => {
          await loadConfettiPreset(engine);
          await loadEmojiShape(engine);
      });
  }

  public getInitParticles(): void {
    this.initParticles();
  }
}
