import pygame
import random
from enum import Enum
from collections import namedtuple

pygame.init()
font = pygame.font.SysFont("arial",25)
class Direction(Enum):
    RIGHT = 1
    LEFT = 2
    UP = 3
    DOWN = 4

Point = namedtuple("Point","x, y")

# RGB colors
WHITE = (225,225,225)
RED = (200,0,0)
BLUE1 = (0,0,225)
BLUE2 = (0,100,225)
BLACK = (0,0,0)

BLOCK_SIZE = 20
SPEED = 40


class SnakeGame:

    def __init__(self,w=640,h=480):
        self.w = w
        self.h = h
        # init display
        self.display = pygame.display.set_mode((self.w,self.h))
        pygame.display.set_caption("Snake")
        self.clock = pygame.time.Clock()

        # init game state
        self.direction = Direction.RIGHT

        self.head = Point(self.w/2 , self.h/2)
        self.snake = [self.head,
        Point(self.head.x-BLOCK_SIZE,self.head.y),
        Point(self.head.x-(2*BLOCK_SIZE),self.head.y)]

        self.score = 0
        self.food = None
        self._place_food()

    def _place_food(self):
        x = random.randint(0,(self.w-BLOCK_SIZE)//BLOCK_SIZE )*BLOCK_SIZE
        y = random.randint(0,(self.h-BLOCK_SIZE)//BLOCK_SIZE )*BLOCK_SIZE
        self.food = Point(x,y)
        if self.food in self.snake:
            self._place_food()



    def play_step(self):
        # 1. collect user input

        # 2. move

        # 3. check if game over

        # 4. palce new food or just move

        # 5. update ui and clock
        self._update_ui()
        self.clock.tick(SPEED)
        # return game over and score
        game_over = False
        return game_over, self.score

    def _update_ui(self):
        self.display.fill(BLACK)

        for pt in self.snake:
            pygame.draw.rect(self.display, BLUE1,pygame.Rect(pt.x,pt.y,BLOCK_SIZE,BLOCK_SIZE))
            pygame.draw.rect(self.display, BLUE2,pygame.Rect(pt.x+4,pt.y+4,12,12))

        pygame.draw.rect(self.display, RED, pygame.Rect(self.food.x,self.food.y,BLOCK_SIZE,BLOCK_SIZE))

        text = font.render("Score: "+str(self.score),True,WHITE)
        self.display.blit(text,[0,0])
        pygame.display.flip()



if __name__ == "__main__":
    game = SnakeGame()

    while True:
        game_over, score = game.play_step()
        if game_over == True:
            break

    print("Final Score",score)

    pygame.quit()
