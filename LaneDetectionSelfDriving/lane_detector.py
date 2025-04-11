
import cv2
import numpy as np

def region_of_interest(img, vertices):
    mask = np.zeros_like(img)
    cv2.fillPoly(mask, [vertices], 255)
    masked = cv2.bitwise_and(img, mask)
    return masked

def make_coordinates(image, line_parameters):
    slope, intercept = line_parameters
    y1 =  image.shape[0]
    y2 = int(y1*(3/5))
    x1 = int((y1 -intercept) / slope)
    x2 = int((y2 -intercept) / slope)
    return np.array([x1, y1, x2, y2])


def average_slope_intercept(image, lines):
    left_fit = [] #Co-ordinates from averaged line of left
    right_fit = [] #Co-ordinates from averaged line of right

    for line in lines:
        x1, y1, x2, y2 = line.reshape(4)
        parameters = np.polyfit((x1, x2), (y1, y2), 1) #Contains slope and y-intercept
        slope = parameters[0]
        intercept = parameters[1]
        if slope < 0:
            left_fit.append((slope, intercept))
        else:
            right_fit.append((slope, intercept))

    left_line = [0, 0, 0, 0]
    right_line = [0, 0, 0, 0]
    if len(left_fit) > 0:    
        left_fit_average = np.average(left_fit, axis = 0)
        left_line = make_coordinates(image, left_fit_average)

    if len(right_fit) > 0:
        right_fit_average = np.average(right_fit, axis = 0)
        right_line = make_coordinates(image, right_fit_average)

    return np.array([left_line, right_line])

def display_lines(image, lines):
    line_image = np.zeros_like(image)
    if lines is not None:
        for line in lines:
            x1, y1, x2, y2 = line.reshape(4)
            cv2.line(line_image, (x1, y1), (x2, y2), (255, 0, 0), 10)
    
    return line_image


def detect_lanes(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(blur, 50, 150)

    height, width = edges.shape
    roi_vertices = [(0, height), (width / 2, height / 2), (width, height)]
    cropped = region_of_interest(edges, np.array(roi_vertices, np.int32))

    #Detecting the lane lines
    lines = cv2.HoughLinesP(cropped, 1, np.pi / 180, 50, maxLineGap=50)

    #Colored image and the lines detected
    averaged_lines = average_slope_intercept(image, lines)

    #Display lines in image
    image = display_lines(image, averaged_lines)

    return image
