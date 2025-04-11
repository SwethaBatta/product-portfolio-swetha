
import cv2
from lane_detector import detect_lanes
from steering_model import SteeringModel

def main():
    model = SteeringModel()
    cap = cv2.VideoCapture('testVideo.mp4')

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        lane_image = detect_lanes(frame)
        combo_image = cv2.addWeighted(frame, 0.8, lane_image, 1, 1)
        cv2.imshow('Lane Detection', combo_image)
        if cv2.waitKey(25) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    main()
