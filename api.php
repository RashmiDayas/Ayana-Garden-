<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Database Connection
 $host = 'localhost';
 $db_name = 'ayana_db';
 $username = 'root'; // Change if needed
 $password = '';     // Change if needed (e.g., 'root' for WAMP)

 $conn = new mysqli($host, $username, $password, $db_name);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]));
}

 $action = $_GET['action'] ?? '';

if ($action === 'login') {
    $input = json_decode(file_get_contents('php://input'), true);
    if ($input['password'] === 'admin123') {
        $_SESSION['admin_logged_in'] = true;
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid password']);
    }
}

elseif ($action === 'check_auth') {
    echo json_encode(['logged_in' => isset($_SESSION['admin_logged_in'])]);
}

elseif ($action === 'logout') {
    session_destroy();
    echo json_encode(['status' => 'success']);
}

elseif ($action === 'get_content') {
    // Fetch the main JSON content
    $result = $conn->query("SELECT content_json FROM site_content WHERE id = 1");
    if ($row = $result->fetch_assoc()) {
        $json = $row['content_json'];
        // If DB is empty, return empty object
        echo $json ? $json : json_encode((object)[]);
    } else {
        echo json_encode((object)[]);
    }
}

elseif ($action === 'save_content') {
    if (!isset($_SESSION['admin_logged_in'])) {
        echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
        exit;
    }
    $input = json_decode(file_get_contents('php://input'), true);
    $jsonContent = json_encode($input['data']);
    
    $stmt = $conn->prepare("UPDATE site_content SET content_json = ? WHERE id = 1");
    $stmt->bind_param("s", $jsonContent);
    
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $stmt->error]);
    }
}

elseif ($action === 'get_bookings') {
    if (!isset($_SESSION['admin_logged_in'])) {
        echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
        exit;
    }
    $result = $conn->query("SELECT * FROM bookings ORDER BY created_at DESC");
    $bookings = [];
    while($row = $result->fetch_assoc()) {
        $bookings[] = $row;
    }
    echo json_encode($bookings);
}

elseif ($action === 'delete_booking') {
    if (!isset($_SESSION['admin_logged_in'])) {
        echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
        exit;
    }
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'];
    
    $stmt = $conn->prepare("DELETE FROM bookings WHERE id = ?");
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $stmt->error]);
    }
}

 $conn->close();
?>