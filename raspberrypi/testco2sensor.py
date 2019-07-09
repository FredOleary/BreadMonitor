#rpi serial connections
#Python app to run a S8 Sensor
import serial
import time
#RPi pin connections:
#pin 6 GND
#pin 4 5v
#pin 8 TXD: UART data to S8
#pin 10 RXD: UART data from S8
ser = serial.Serial("/dev/serial0",baudrate =9600,timeout = .5)
print " AN-168: Raspberry Pi3 to S8 Via UART\n"
ser.flushInput()
time.sleep(1)
for i in range(1,201): # Print 20 readings from sensor
 ser.flushInput()
 ser.write("\xFE\x44\x00\x08\x02\x9F\x25")
 time.sleep(.5)
 resp = ser.read(7)
 high = ord(resp[3])
 low = ord(resp[4])
 co2 = (high*256) + low
 print "i = ",i, " CO2 = " +str(co2)
 time.sleep(.1)
 
